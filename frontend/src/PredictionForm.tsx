import React, { useState } from "react";
import axios from "axios";

const InputField: React.FC<{
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}> = ({ label, value, onChange, placeholder }) => (
  <div className="flex flex-col space-y-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type="number"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      className="p-3 border rounded-xl w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
      required
    />
  </div>
);

const PredictionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    Hours_Studied: 0,
    Sleep_Hours: 0,
    Physical_Activity: 0,
    Extracurricular_Activities: 0,
    Healthy_Diet: 0,
    Previous_Score: 0,
  });

  const [prediction, setPrediction] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const allDefault = Object.values(formData).every((val) => val === 0);
    if (allDefault) {
      setPrediction(0);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/predict", formData);
      setPrediction(Math.abs(response.data.predicted_performance_score));
    } catch (error) {
      console.error("Error making prediction:", error);
      setError("Failed to make prediction. Please try again.");
      setPrediction(null);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
           Predict Your Score
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="📚 Hours Studied"
            value={formData.Hours_Studied}
            onChange={(val) => setFormData({ ...formData, Hours_Studied: val })}
            placeholder="e.g., 5.2"
          />

          <InputField
            label="😴 Sleep Hours"
            value={formData.Sleep_Hours}
            onChange={(val) => setFormData({ ...formData, Sleep_Hours: val })}
            placeholder="e.g., 7.5"
          />

          <InputField
            label="🏃‍♂️ Physical Activity (hours/week)"
            value={formData.Physical_Activity}
            onChange={(val) => setFormData({ ...formData, Physical_Activity: val })}
            placeholder="e.g., 3.0"
          />

          <InputField
            label="🎭 Extracurricular Activities"
            value={formData.Extracurricular_Activities}
            onChange={(val) => setFormData({ ...formData, Extracurricular_Activities: val })}
            placeholder="e.g., 2"
          />

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700">🥗 Healthy Diet</label>
            <select
              value={formData.Healthy_Diet}
              onChange={(e) => setFormData({ ...formData, Healthy_Diet: parseInt(e.target.value, 10) })}
              className="p-3 border rounded-xl w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
              required
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>

          <InputField
            label="📊 Previous Score"
            value={formData.Previous_Score}
            onChange={(val) => setFormData({ ...formData, Previous_Score: val })}
            placeholder="e.g., 85.0"
          />

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:shadow-md transition transform hover:scale-[1.02]"
          >
            🔮 Predict
          </button>
        </form>

        {/* Display Prediction or Error */}
        {prediction !== null && (
          <p className="mt-6 text-lg font-semibold text-center text-green-600">
            🎯 Predicted Score: {prediction.toFixed(2)}
          </p>
        )}
        {error && (
          <p className="mt-6 text-lg font-semibold text-center text-red-600">
             {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default PredictionForm;
