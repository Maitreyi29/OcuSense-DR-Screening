# 👁️ OcuSense — Explainable AI for Diabetic Retinopathy Screening

> **An AI-powered retinal screening system combining deep learning, computer vision, explainable AI, and full-stack web development.**

OcuSense is an academic and research-oriented **AI-based Diabetic Retinopathy Screening System** designed to analyze retinal fundus images and classify diabetic retinopathy across **five severity stages**.

The system combines a lightweight **MobileNetV2** deep learning model with **Grad-CAM explainability**, allowing users to view not only the predicted severity stage but also a visual heatmap showing the regions that contributed to the model's prediction.

The project includes a complete full-stack architecture consisting of a **React + Vite + Tailwind CSS frontend**, a **FastAPI backend**, a **PyTorch inference engine**, and an explainability pipeline using **Grad-CAM**.

---

## ✨ Key Features

### 🤖 AI-Powered Screening

- MobileNetV2-based deep learning model
- Five-stage diabetic retinopathy classification
- PyTorch inference pipeline
- Confidence and probability visualization
- Lightweight architecture suitable for resource-constrained environments

### 🔬 Explainable AI

- Grad-CAM-based visual explainability
- Heatmap generation from the model's final convolutional layer
- Visual interpretation of regions influencing the prediction
- Helps demonstrate how an AI model arrives at its classification

### 🖥️ Modern Healthcare Interface

The OcuSense frontend was designed as a professional healthcare + AI interface rather than a basic machine-learning demo.

Frontend capabilities include:

- Responsive healthcare-oriented UI
- Retinal image upload
- Drag-and-drop support
- Image preview
- AI screening workflow
- Prediction results dashboard
- Confidence visualization
- Five-stage classification information
- Grad-CAM visualization
- Screening history
- FAQ section
- About OcuSense section
- How-it-works workflow
- Help and guidance section
- Contact section
- Authentication UI
- Loading states
- Error handling
- Responsive desktop, tablet, and mobile design

---

# 🩺 Five-Stage Diabetic Retinopathy Classification

OcuSense classifies retinal images into five diabetic retinopathy severity levels:

| Stage | Classification | Description |
|---:|---|---|
| **0** | No DR | No visible diabetic retinopathy |
| **1** | Mild DR | Early non-proliferative diabetic retinopathy |
| **2** | Moderate DR | Moderate non-proliferative diabetic retinopathy |
| **3** | Severe DR | Severe non-proliferative diabetic retinopathy |
| **4** | Proliferative DR | Advanced proliferative diabetic retinopathy |

---

# 🔬 Explainable AI with Grad-CAM

OcuSense incorporates **Gradient-weighted Class Activation Mapping (Grad-CAM)** to provide visual explanations for model predictions.

The Grad-CAM pipeline:

```text
Retinal Fundus Image
        ↓
Image Preprocessing
        ↓
MobileNetV2
        ↓
Predicted DR Class
        ↓
Gradient Extraction
        ↓
Activation Mapping
        ↓
Grad-CAM Heatmap
        ↓
Visual Explanation
```

The system extracts feature activations and gradients from the model's final convolutional layer and generates an activation heatmap.

The resulting visualization can be displayed alongside the original retinal image to provide an interpretable representation of the model's attention.

---

# 🧠 Machine Learning Model

The selected architecture for OcuSense is **MobileNetV2**.

MobileNetV2 was selected because it provides a good balance between:

- Model size
- Computational efficiency
- Inference speed
- Classification performance
- Edge deployment feasibility

### Model Details

| Property | Value |
|---|---|
| Architecture | MobileNetV2 |
| Framework | PyTorch |
| Input Size | 224 × 224 |
| Output Classes | 5 |
| Model Weights | `best_mobilenet_v2.pth` |
| Weight File Size | ~8.7 MB |
| Explainability | Grad-CAM |

---

# 📊 Model Benchmarking

Multiple CNN architectures were evaluated during development.

| Architecture | Parameters | Approx. Weight Size | Validation Accuracy | Validation Macro F1 |
|---|---:|---:|---:|---:|
| ResNet-50 | ~25.5M | ~98 MB | 80.08% | 0.6544 |
| EfficientNet-B0 | ~5.3M | ~21 MB | 79.40% | 0.6497 |
| **MobileNetV2** | **~3.4M** | **~8.7 MB** | **79.26%** | **0.6439** |

MobileNetV2 was selected as the deployment model because of its significantly smaller model footprint and suitability for lightweight inference.

---

# 🔬 Dataset

The model was developed using the:

**APTOS 2019 Blindness Detection Dataset**

The dataset contains retinal fundus photographs labeled according to diabetic retinopathy severity.

Dataset:

https://www.kaggle.com/competitions/aptos2019-blindness-detection

### Target Classes

```text
0 → No DR
1 → Mild DR
2 → Moderate DR
3 → Severe DR
4 → Proliferative DR
```

---

# 🏗️ System Architecture

```text
                   ┌──────────────────────┐
                   │      User / PHC      │
                   │   Health Worker      │
                   └──────────┬───────────┘
                              │
                              │ Fundus Image
                              ▼
                   ┌──────────────────────┐
                   │   React Frontend     │
                   │ React + Vite         │
                   │ Tailwind CSS         │
                   └──────────┬───────────┘
                              │
                              │ REST API
                              ▼
                   ┌──────────────────────┐
                   │    FastAPI Backend   │
                   │   /api/predict       │
                   └──────────┬───────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │ Image Preprocessing  │
                   │   224 × 224 RGB      │
                   └──────────┬───────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │     MobileNetV2      │
                   │   PyTorch Inference  │
                   └──────────┬───────────┘
                              │
                 ┌────────────┴────────────┐
                 ▼                         ▼
        ┌─────────────────┐       ┌─────────────────┐
        │   Prediction    │       │    Grad-CAM     │
        │ 5-Class Softmax │       │ Explainability  │
        └────────┬────────┘       └────────┬────────┘
                 │                         │
                 └────────────┬────────────┘
                              ▼
                   ┌──────────────────────┐
                   │   JSON API Response  │
                   └──────────┬───────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │ OcuSense Results UI  │
                   │                      │
                   │ • Predicted Stage    │
                   │ • Confidence         │
                   │ • Probabilities      │
                   │ • Grad-CAM Heatmap   │
                   │ • Screening Details  │
                   └──────────────────────┘
```

---

# 📁 Project Structure

```text
OcuSense-DR-Screening/
│
├── backend/
│   │
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── model.py
│   │   └── gradcam.py
│   │
│   ├── model/
│   │   └── best_mobilenet_v2.pth
│   │
│   ├── sample_images/
│   │   └── sample_retina.png
│   │
│   └── requirements.txt
│
├── frontend/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# 🖥️ Frontend

The frontend is built as a modern AI-powered healthcare application called **OcuSense**.

### Frontend Technology Stack

| Technology | Purpose |
|---|---|
| React | UI development |
| Vite | Frontend build tool |
| Tailwind CSS | Styling |
| JavaScript | Application logic |
| Lucide Icons | UI icons |

### Frontend Workflow

```text
User
 ↓
OcuSense Dashboard
 ↓
Upload Retinal Image
 ↓
Image Preview
 ↓
Send to Backend
 ↓
AI Screening
 ↓
Prediction Results
 ↓
Confidence Visualization
 ↓
Grad-CAM Explanation
 ↓
Screening History
```

---

# ⚙️ Backend

The backend is implemented using **FastAPI** and provides the inference API required by the OcuSense frontend.

### API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health` | Check API and model status |
| `GET` | `/api/sample` | Retrieve sample retinal image |
| `POST` | `/api/predict` | Perform DR prediction and generate Grad-CAM |

### API Documentation

Swagger / OpenAPI documentation is available at:

https://ocusense-api.onrender.com/docs

---

# 🔄 Application Workflow

```text
1. User opens OcuSense
          ↓
2. User uploads a retinal fundus image
          ↓
3. Frontend sends the image to FastAPI
          ↓
4. Backend validates the image
          ↓
5. Image preprocessing is performed
          ↓
6. MobileNetV2 performs inference
          ↓
7. Five-class probability distribution is generated
          ↓
8. Grad-CAM generates an explainability heatmap
          ↓
9. Backend returns prediction data
          ↓
10. Frontend displays:
       • Predicted stage
       • Confidence
       • Class probabilities
       • Grad-CAM visualization
       • Screening information
```

---

# 💻 Local Development

## 1. Clone the Repository

```bash
git clone https://github.com/Maitreyi29/OcuSense-DR-Screening.git
cd OcuSense-DR-Screening
```

---

## 2. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

```bash
python3 -m venv venv
```

Activate the virtual environment.

### macOS / Linux

```bash
source venv/bin/activate
```

### Windows

```bash
venv\Scripts\activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn app.main:app --reload --port 8000
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

---

# 3. Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will typically be available at:

```text
http://localhost:5173
```

---

# 🌐 Deployment

The application architecture supports independent deployment of the frontend and backend.

### Frontend

**Vercel**

Production frontend:

https://ocu-sense-dr-screening.vercel.app

### Backend

**Render**

Production API:

https://ocusense-api.onrender.com

### API Documentation

https://ocusense-api.onrender.com/docs

---

# 🛡️ Medical & Research Disclaimer

> **OcuSense is an academic and research-oriented AI screening project.**
>
> The predictions generated by this system are intended for educational, research, and screening-assistance purposes only.
>
> OcuSense is **not a certified medical diagnostic device** and must not be used as a substitute for examination, diagnosis, or treatment by a qualified ophthalmologist or other healthcare professional.
>
> The system should not be used to make independent clinical decisions without appropriate professional medical supervision.

---

# 🔐 Privacy

OcuSense is designed as a demonstration and research system.

Users should **not upload personally identifiable medical information or patient data** to the publicly deployed demonstration unless appropriate privacy, security, consent, and regulatory requirements have been established.

---

# 🎓 Academic Project

OcuSense was developed as a **BTech Computer Science / Machine Learning project** combining:

- Deep Learning
- Computer Vision
- Explainable AI
- Medical Image Analysis
- Full-Stack Development
- REST APIs
- Cloud Deployment

The project demonstrates the complete pipeline:

```text
Medical Image
      ↓
AI Model
      ↓
Prediction
      ↓
Explainable AI
      ↓
REST API
      ↓
Interactive Web Application
```

---

# 🧰 Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Backend | FastAPI |
| ML Framework | PyTorch |
| Computer Vision | OpenCV |
| Model | MobileNetV2 |
| Explainability | Grad-CAM |
| Image Processing | Pillow |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |
| Dataset | APTOS 2019 |
| API Documentation | Swagger / OpenAPI |

---

# 🎯 Project Goals

The primary goals of OcuSense are:

1. Develop a lightweight deep learning model for diabetic retinopathy screening.
2. Classify retinal images across five severity stages.
3. Integrate explainable AI using Grad-CAM.
4. Build an accessible healthcare-oriented web interface.
5. Connect the ML model to a production-style REST API.
6. Demonstrate an end-to-end AI application architecture.
7. Explore how lightweight AI systems can support screening workflows in resource-constrained environments.

---

# ⭐ Project Vision

OcuSense explores how **lightweight deep learning + explainable AI + accessible web technology** can be combined into a practical retinal screening workflow.

The long-term vision is to evolve the prototype into a scalable application that can support screening workflows in resource-constrained healthcare environments while keeping the AI decision-making process visually interpretable.

---

# 👩‍💻 Developer

### Maitreyi Shandilya

**BTech Computer Science Engineering**  
**Machine Learning & Full-Stack Development**

GitHub:

https://github.com/Maitreyi29

Project Repository:

https://github.com/Maitreyi29/OcuSense-DR-Screening

---

# 📜 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <b>👁️ OcuSense</b><br>
  Explainable AI for Diabetic Retinopathy Screening
</p>
