import os
import torch
import torch.nn as nn
import torchvision.models as models
from torchvision import transforms

# 1. Stage mappings & clinical screening recommendations
CLASS_INFO = {
    0: {
        "name": "No Diabetic Retinopathy",
        "severity": "Normal",
        "description": "No visible microvascular retinal abnormalities detected.",
        "recommendation": "Routine annual screening advised."
    },
    1: {
        "name": "Mild Diabetic Retinopathy",
        "severity": "Mild",
        "description": "Microaneurysms only (tiny red vascular outpouchings).",
        "recommendation": "Follow-up screening in 6 to 12 months with glycemic control."
    },
    2: {
        "name": "Moderate Diabetic Retinopathy",
        "severity": "Moderate",
        "description": "Multiple microaneurysms, blot hemorrhages, and/or hard exudates.",
        "recommendation": "Referral to an ophthalmologist within 2-4 months for evaluation."
    },
    3: {
        "name": "Severe Diabetic Retinopathy",
        "severity": "Severe",
        "description": "Extensive hemorrhages in 4 quadrants, venous beading, or cotton-wool infarcts.",
        "recommendation": "Urgent specialist referral within 2-4 weeks. Risk of progression is high."
    },
    4: {
        "name": "Proliferative Diabetic Retinopathy",
        "severity": "Proliferative",
        "description": "Neovascularization (abnormal fragile new vessels) and/or vitreous hemorrhage.",
        "recommendation": "Immediate ophthalmic intervention required (laser photocoagulation / anti-VEGF)."
    }
}

# 2. Exact preprocessing transform matching training
inference_transforms = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# 3. Model Loader Function
def build_mobilenet_v2(weights_path: str = None, device: str = "cpu"):
    """
    Builds MobileNetV2 architecture with 5 classes and loads checkpoint weights.
    """
    model = models.mobilenet_v2(weights=None)
    in_features = model.classifier[1].in_features
    model.classifier = nn.Sequential(
        nn.Dropout(p=0.3),
        nn.Linear(in_features, 5)
    )

    if weights_path and os.path.exists(weights_path):
        state_dict = torch.load(weights_path, map_location=device)
        model.load_state_dict(state_dict)
        print(f"Loaded trained weights from: {weights_path}")
    else:
        print(f"WARNING: Weights file not found at {weights_path}")

    model.to(device)
    model.eval()
    return model