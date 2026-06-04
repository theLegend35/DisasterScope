# DisasterScope

> **Empowering communities to easily understand their local natural disaster risks and learn how to proactively prepare for them.**

---

## Project Overview

DisasterScope bridges the gap between complex climate data and everyday citizens. By leveraging a custom machine learning model trained on federal data, the app provides localized, easy-to-understand disaster risk scores for every county in the United States, alongside actionable preparation tools.

### Target Audience
- **Families & Students:** Learn about local environmental risks and track home safety actions.
- **Schools & Educators:** Teach disaster awareness and climate science with an interactive tool.
- **Local Communities & Emergency Planners:** Quickly visualize and prepare for regional threats.

---

## Features

- **Home Screen (Risk Predictor):** Select your state and county to instantly generate risk scores (0–100) for hurricanes, tornadoes, floods, wildfires, and more.
- **Checklist Screen:** Interactive preparation checklist with essential safety tasks.
- **Helpful Links Screen:** One-tap access to FEMA guides, weather alerts, evacuation maps, and emergency services.
- **Sources Screen:** Transparent documentation of datasets and scientific references.
- **About Screen:** Mission, vision, and technology powering DisasterScope.

---

## Tech Stack

| Component | Technologies Used | Purpose |
|----------|-------------------|---------|
| **Front-End** | React Native, TypeScript, Expo | Cross-platform UI and mobile deployment |
| **Back-End** | Python, FastAPI, Render | API + ML prediction server |
| **Machine Learning** | scikit-learn, Pandas | Custom risk scoring engine |
| **Data Source** | FEMA National Risk Index | Baseline hazard frequency & impact data |

---

## How It Works Behind the Scenes

```text
[ Mobile App (React Native) ] 
       │  (User selects State/County)
       ▼
[ FastAPI Server (Hosted on Render) ]
       │  (Passes location data)
       ▼
[ scikit-learn ML Model ] ─── (Processes FEMA National Risk Index CSV)
       │  
       ▼
[ Risk Scores 0-100 Generated ]
       │
       ▼
[ Front-End UI updates instantly ]
```

### Data Training
A custom machine learning model was developed in Python using scikit-learn, trained on the FEMA National Risk Index dataset to analyze historical frequencies and environmental vulnerabilities.

### API Deployment
The model is wrapped in a lightweight FastAPI framework and hosted on Render.

### Cross-Platform Delivery
When a user inputs their location, the app sends a secure request to the backend. The server calculates risk percentages and returns them instantly.

---

## Installation & Setup

To run this project locally, clone both the front-end and back-end environments.

---

## Prerequisites

- Node.js (v18+ recommended)  
- Expo Go app (for mobile testing)  
- Python 3.9+  

---

## Front-End Setup

Navigate to the frontend directory:

```bash
cd disasterscope-frontend
```

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

Scan the QR code using your phone’s camera or the Expo Go app.

---

## Back-End Setup

Navigate to the backend directory:

```bash
cd disasterscope-backend
```

Create a virtual environment and install dependencies:

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Launch the FastAPI server:

```bash
uvicorn main:app --reload
```

---

## License

This project is open-source and available under the MIT License.
