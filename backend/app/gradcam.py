import io
import base64
import cv2
import numpy as np
import torch
import torch.nn.functional as F
from PIL import Image

class GradCAM:
    """
    Lightweight, zero-hook Grad-CAM implementation optimized for resource-constrained environments (512MB RAM).
    Runs forward pass up to features[-1] without autograd, then computes gradients through the classifier layer.
    """
    def __init__(self, model, target_layer=None):
        self.model = model

    def generate_heatmap(self, input_tensor: torch.Tensor, target_class: int = None):
        self.model.eval()

        # Step 1: Forward feature extractor without building 150-layer autograd graph
        with torch.no_grad():
            feat = self.model.features(input_tensor)

        # Step 2: Enable grad ONLY on final 7x7 feature map (uses <1MB RAM)
        feat_grad = feat.detach().clone().requires_grad_(True)
        pooled = F.adaptive_avg_pool2d(feat_grad, (1, 1))
        flat = torch.flatten(pooled, 1)
        output = self.model.classifier(flat)

        if target_class is None:
            target_class = torch.argmax(output, dim=1).item()

        # Step 3: Backward pass through classifier ONLY
        self.model.zero_grad()
        score = output[0, target_class]
        score.backward()

        # Step 4: Compute Grad-CAM heatmap
        grads = feat_grad.grad
        weights = torch.mean(grads, dim=[2, 3], keepdim=True)
        cam = torch.sum(weights * feat_grad, dim=1, keepdim=True)
        cam = F.relu(cam)

        cam = cam.squeeze().detach().cpu().numpy()
        cam = cv2.resize(cam, (224, 224))
        cam = cam - np.min(cam)
        cam = cam / (np.max(cam) + 1e-8)

        probs = F.softmax(output, dim=1)[0].detach().cpu().numpy()

        # Step 5: Clean up temporary variables
        del feat, feat_grad, pooled, flat, output, grads

        return cam, target_class, probs


def pil_to_base64(image_pil: Image.Image) -> str:
    """Converts a PIL Image to a base64 encoded JPEG string (optimized for network transfer)."""
    buffered = io.BytesIO()
    image_pil.save(buffered, format="JPEG", quality=85)
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return f"data:image/jpeg;base64,{img_str}"


def create_gradcam_overlay_base64(original_pil: Image.Image, heatmap: np.ndarray, alpha=0.45):
    """
    Overlays Grad-CAM heatmap on the original image and returns both as optimized base64 strings.
    """
    img_resized = original_pil.resize((224, 224)).convert("RGB")
    img_np = np.array(img_resized)

    # Colorize heatmap with JET colormap
    heatmap_colored = cv2.applyColorMap(np.uint8(255 * heatmap), cv2.COLORMAP_JET)
    heatmap_colored = cv2.cvtColor(heatmap_colored, cv2.COLOR_BGR2RGB)

    # Blend
    blended_np = np.uint8(alpha * heatmap_colored + (1 - alpha) * img_np)
    blended_pil = Image.fromarray(blended_np)

    original_base64 = pil_to_base64(img_resized)
    overlay_base64 = pil_to_base64(blended_pil)

    return original_base64, overlay_base64