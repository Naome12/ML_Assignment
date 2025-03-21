import React from "react";
import PredictionForm from "./PredictionForm";

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl md:text-4xl font-extrabold  mb-6 drop-shadow-lg text-center">Student Performance Predictor</h1>
      <PredictionForm />
    </div>
  );
};

export default App;