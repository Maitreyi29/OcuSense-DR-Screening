import io
import base64
import numpy as np
import torch
import torch.nn.functional as F
from PIL import Image

class GradCAM:
    """
    Lightweight, zero-hook, pure-NumPy Grad-CAM implementation.
    Optimized for memory-constrained cloud environments (Render 512MB RAM).
    Runs forward pass up to features[-1] without autograd, then computes gradients through classifier layer only.
    """
    def __init__(self, model, target_layer=None):
        self.model = model

    def generate_heatmap(self, input_tensor: torch.Tensor, target_class: int = None):
        self.model.eval()

        # Step 1: Forward feature extractor without autograd graph (saves ~100MB RAM)
        with torch.no_grad():
            feat = self.model.features(input_tensor)

        # Step 2: Enable grad ONLY on final 7x7 feature map (<1MB RAM)
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

        cam_np = cam.squeeze().detach().cpu().numpy()
        cam_np = cam_np - np.min(cam_np)
        cam_np = cam_np / (np.max(cam_np) + 1e-8)

        # Resize 7x7 heatmap to 224x224 using PIL (zero OpenCV dependency)
        cam_img = Image.fromarray((cam_np * 255.0).astype(np.uint8))
        cam_img_resized = cam_img.resize((224, 224), Image.Resampling.BILINEAR)
        cam_resized_np = np.array(cam_img_resized, dtype=np.float32) / 255.0

        probs = F.softmax(output, dim=1)[0].detach().cpu().numpy()

        # Clean up temporary tensors
        del feat, feat_grad, pooled, flat, output, grads, cam, cam_img

        return cam_resized_np, target_class, probs


def apply_jet_colormap(heatmap_2d: np.ndarray) -> np.ndarray:
    """Computes JET colormap overlay using pure NumPy (zero OpenCV dependency)."""
    x = np.clip(heatmap_2d, 0.0, 1.0)
    r = np.clip(1.5 - np.abs(4.0 * x - 3.0), 0.0, 1.0)
    g = np.clip(1.5 - np.abs(4.0 * x - 2.0), 0.0, 1.0)
    b = np.clip(1.5 - np.abs(4.0 * x - 1.0), 0.0, 1.0)
    rgb = np.stack([r, g, b], axis=-1)
    return (rgb * 255.0).astype(np.uint8)


def pil_to_base64(image_pil: Image.Image) -> str:
    """Converts a PIL Image to a base64 encoded JPEG string (compressed for fast network transfer)."""
    buffered = io.BytesIO()
    image_pil.save(buffered, format="JPEG", quality=85)
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return f"data:image/jpeg;base64,{img_str}"


def create_gradcam_overlay_base64(original_pil: Image.Image, heatmap: np.ndarray, alpha=0.45):
    """
    Overlays Grad-CAM heatmap on the original image and returns both as optimized base64 strings.
    """
    img_resized = original_pil.resize((224, 224)).convert("RGB")
    img_np = np.array(img_resized, dtype=np.float32)

    # Colorize heatmap with pure NumPy JET colormap
    heatmap_colored = apply_jet_colormap(heatmap).astype(np.float32)

    # Blend
    blended_np = np.uint8(np.clip(alpha * heatmap_colored + (1 - alpha) * img_np, 0, 255))
    blended_pil = Image.fromarray(blended_np)

    original_base64 = pil_to_base64(img_resized)
    overlay_base64 = pil_to_base64(blended_pil)

    return original_base64, overlay_base64