import io
import base64
import cv2
import numpy as np
import torch
import torch.nn.functional as F
from PIL import Image

class GradCAM:
    def __init__(self, model, target_layer):
        self.model = model
        self.target_layer = target_layer
        self.gradients = None
        self.activations = None
        
        # Register hooks
        self.target_layer.register_forward_hook(self._save_activation)
        self.target_layer.register_full_backward_hook(self._save_gradient)

    def _save_activation(self, module, input, output):
        self.activations = output.detach()

    def _save_gradient(self, module, grad_input, grad_output):
        self.gradients = grad_output[0].detach()

    def generate_heatmap(self, input_tensor, target_class=None):
        self.model.eval()
        output = self.model(input_tensor)

        if target_class is None:
            target_class = torch.argmax(output, dim=1).item()

        self.model.zero_grad()
        score = output[0, target_class]
        score.backward(retain_graph=False)

        # Global average pooling of gradients
        weights = torch.mean(self.gradients, dim=[2, 3], keepdim=True)
        cam = torch.sum(weights * self.activations, dim=1, keepdim=True)
        cam = F.relu(cam)

        cam = cam.squeeze().cpu().numpy()
        cam = cv2.resize(cam, (224, 224))
        cam = cam - np.min(cam)
        cam = cam / (np.max(cam) + 1e-8)

        probs = F.softmax(output, dim=1)[0].detach().cpu().numpy()
        
        # Clean up references to prevent memory accumulation
        self.gradients = None
        self.activations = None

        return cam, target_class, probs


def pil_to_base64(image_pil: Image.Image) -> str:
    """Converts a PIL Image to a base64 encoded PNG string."""
    buffered = io.BytesIO()
    image_pil.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return f"data:image/png;base64,{img_str}"


def create_gradcam_overlay_base64(original_pil: Image.Image, heatmap: np.ndarray, alpha=0.45):
    """
    Overlays Grad-CAM heatmap on the original image and returns both as base64 strings.
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