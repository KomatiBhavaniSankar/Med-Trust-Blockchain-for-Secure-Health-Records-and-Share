import React from "react";
import Healthcare from "./Healthcare"; // Ensure correct location
import Navbar from "./component/Navbar";
import Report from "./component/Report";
import Instructions from "./component/Instructions";
import RiskPredictor from "./component/RiskPredictor";
import Contact from "./component/contact"; // Ensure correct filename and location
import MedicalInsurancePrediction from "./component/MedicalInsurancePrediction";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/healthcare" element={<Healthcare />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Report" element={<Report />} />  
          <Route path="/Instructions" element={<Instructions />} />
          <Route path="/RiskPredictor" element={<RiskPredictor />} />
          <Route path="/MedicalInsurancePrediction" element={<MedicalInsurancePrediction />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
