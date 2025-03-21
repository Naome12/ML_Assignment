# Student Performance Predictor

This project predicts a student's performance score based on their study habits, lifestyle factors, and previous academic performance. It consists of a **FastAPI backend** for the prediction model and a **React frontend** for user interaction.

---

## Features

- **Backend**:
  - Built with FastAPI.
  - Uses a multilinear regression model trained on synthetic student data.
  - Provides a `/predict` endpoint for making predictions.

- **Frontend**:
  - Built with React, TypeScript, and TailwindCSS.
  - Allows users to input data and view the predicted performance score.
  - Responsive and user-friendly interface.

- **Dataset**:
  - Synthetic dataset with 500 rows.
  - Features include:
    - Hours Studied
    - Sleep Hours
    - Physical Activity
    - Extracurricular Activities
    - Healthy Diet
    - Previous Score
  - Target variable: `Performance_Score`.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- **Python 3.8+** (for the backend)
- **Node.js 16+** (for the frontend)
- **pip** (Python package manager)
- **npm** (Node.js package manager)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/student-performance-predictor.git
cd student-performance-predictor