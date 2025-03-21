from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import joblib

# Load the trained model
model = joblib.load("student_performance_model.pkl")

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change "*" to your frontend URL for security
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

class StudentData(BaseModel):
    Hours_Studied: float
    Sleep_Hours: float
    Physical_Activity: float
    Extracurricular_Activities: int
    Healthy_Diet: int
    Previous_Score: float

@app.post("/predict")
def predict(data: StudentData):
    input_data = np.array([[ 
        data.Hours_Studied,
        data.Sleep_Hours,
        data.Physical_Activity,
        data.Extracurricular_Activities,
        data.Healthy_Diet,
        data.Previous_Score
    ]])
    prediction = model.predict(input_data)
    return {"predicted_performance_score": prediction[0]}
