import os
import io
import torch
import logging
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image

# Optimize PyTorch CPU performance for resource-constrained environments (e.g. Render 0.1 CPU)
torch.set_num_threads(1)
torch.set_num_interop_threads(1)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ocusense-api")

# Import local modules from app
from app.model import build_mobilenet_v2, inference_transforms, CLASS_INFO
from app.gradcam import GradCAM, create_gradcam_overlay_base64, pil_to_base64

# 1. Initialize FastAPI Application
app = FastAPI(
    title="OcuSense DR Screening API",
    description="Explainable AI Screening System using MobileNetV2 and Grad-CAM",
    version="1.0.0"
)

# 2. Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Path Configuration
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_BACKEND_DIR = os.path.abspath(os.path.join(CURRENT_DIR, ".."))
MODEL_WEIGHTS_PATH = os.path.join(PROJECT_BACKEND_DIR, "model", "best_mobilenet_v2.pth")
SAMPLE_IMAGE_PATH = os.path.join(PROJECT_BACKEND_DIR, "sample_images", "sample_retina.png")

# 4. In-Memory AI Serving
device = "cpu"
model = None
grad_cam_engine = None

@app.on_event("startup")
def startup_event():
    global model, grad_cam_engine
    logger.info(f"Loading trained model from {MODEL_WEIGHTS_PATH}...")
    model = build_mobilenet_v2(MODEL_WEIGHTS_PATH, device=device)
    grad_cam_engine = GradCAM(model, model.features[-1])
    logger.info("Model and Grad-CAM engine successfully loaded into memory!")

# --- ENDPOINTS ---

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "connected": True,
        "model_loaded": model is not None,
        "device": device
    }

@app.get("/api/sample")
def get_sample_image():
    if not os.path.exists(SAMPLE_IMAGE_PATH):
        raise HTTPException(status_code=404, detail="Sample image not found on server.")
    
    with Image.open(SAMPLE_IMAGE_PATH) as img:
        img_rgb = img.convert("RGB")
        b64 = pil_to_base64(img_resized := img_rgb.resize((224, 224)))
        return {"sample_image_base64": b64}

@app.post("/api/predict")
async def predict_retinopathy(file: UploadFile = File(...)):
    # 1. Validate MIME type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be a valid image (PNG/JPEG).")

    try:
        # 2. Read bytes into PIL
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to decode image file: {str(e)}")

    try:
        # 3. Preprocess matching training pipeline
        input_tensor = inference_transforms(image).unsqueeze(0).to(device)

        # 4. Generate Predictions & Grad-CAM
        heatmap, pred_stage, probs = grad_cam_engine.generate_heatmap(input_tensor)
        confidence = float(probs[pred_stage])

        # 5. Create Base64 Visualizations
        original_b64, overlay_b64 = create_gradcam_overlay_base64(image, heatmap)
    except Exception as e:
        logger.error(f"Inference error during prediction: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Inference failed: {str(e)}")

    # 6. Format exact payload expected by ResultsDashboard.jsx
    response_payload = {
        "predicted_stage": int(pred_stage),
        "class_name": CLASS_INFO[pred_stage]["name"],
        "severity": CLASS_INFO[pred_stage]["severity"],
        "confidence": float(confidence),  # Decimal format (e.g., 0.785)
        "description": CLASS_INFO[pred_stage]["description"],
        "recommendation": CLASS_INFO[pred_stage]["recommendation"],
        "probability_distribution": [
            {
                "stage": i,
                "name": CLASS_INFO[i]["name"],
                "severity": CLASS_INFO[i]["severity"],
                "probability": round(float(probs[i]) * 100, 1)
            }
            for i in range(5)
        ],
        "original_image": original_b64,
        "gradcam_overlay": overlay_b64,
        "disclaimer": "Academic screening & triage assistance tool. Not a substitute for formal clinical diagnosis."
    }

    return JSONResponse(content=response_payload)