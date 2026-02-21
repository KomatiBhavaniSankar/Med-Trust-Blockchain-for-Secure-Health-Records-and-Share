import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

const MedicalInsurancePrediction = () => {
    const [model, setModel] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [inputData, setInputData] = useState({
        age: "",
        gender: "",
        income: "",
        bmi: "",
        smoking: "",
        conditions: "",
        dependents: "",
    });

    useEffect(() => {
        trainModel(); // Train the model when the component loads
    }, []);

    const insuranceData = [
        { age: 25, gender: "Male", income: 400000, bmi: 24, smoking: "No", conditions: 0, dependents: 1, cost: 15000 },
        { age: 35, gender: "Female", income: 600000, bmi: 28, smoking: "No", conditions: 1, dependents: 2, cost: 35000 },
        { age: 45, gender: "Male", income: 800000, bmi: 30, smoking: "Yes", conditions: 2, dependents: 0, cost: 85000 },
        { age: 50, gender: "Female", income: 750000, bmi: 26, smoking: "No", conditions: 1, dependents: 3, cost: 50000 },
        { age: 40, gender: "Male", income: 550000, bmi: 27, smoking: "Yes", conditions: 2, dependents: 1, cost: 65000 },
    ];

    const trainModel = async () => {
        const formattedData = insuranceData.map(d => ({
            age: d.age,
            gender: d.gender === "Male" ? 1 : 0,
            income: d.income / 1000000, // Normalize
            bmi: d.bmi / 50,
            smoking: d.smoking === "Yes" ? 1 : 0,
            conditions: d.conditions,
            dependents: d.dependents,
            cost: d.cost / 100000, // Normalize cost
        }));

        const xs = tf.tensor2d(formattedData.map(d => [d.age, d.gender, d.income, d.bmi, d.smoking, d.conditions, d.dependents]));
        const ys = tf.tensor2d(formattedData.map(d => [d.cost]));

        const model = tf.sequential();
        model.add(tf.layers.dense({ inputShape: [7], units: 12, activation: "relu" }));
        model.add(tf.layers.dense({ units: 6, activation: "relu" }));
        model.add(tf.layers.dense({ units: 1, activation: "linear" }));

        model.compile({ optimizer: "adam", loss: "meanSquaredError" });

        await model.fit(xs, ys, { epochs: 200 });
        setModel(model);
    };

    const handleInputChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const makePrediction = async () => {
        if (!model) return;

        const inputArray = [
            parseFloat(inputData.age),
            inputData.gender === "Male" ? 1 : 0,
            parseFloat(inputData.income) / 1000000,
            parseFloat(inputData.bmi) / 50,
            inputData.smoking === "Yes" ? 1 : 0,
            parseInt(inputData.conditions),
            parseInt(inputData.dependents),
        ];

        const tensorInput = tf.tensor2d([inputArray]);
        const output = model.predict(tensorInput);
        const predictedCost = (await output.data())[0] * 100000; // Convert back to INR scale

        setPrediction(predictedCost.toFixed(2));
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f3f4f6" }}>
            <div style={{ width: "400px", padding: "20px", backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
                <h2 style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>Insurance Cost Predictor (India)</h2>
                <input type="number" name="age" placeholder="Age" onChange={handleInputChange} style={{ width: "100%", padding: "8px", margin: "8px 0", border: "1px solid #ccc", borderRadius: "5px" }} />
                <select name="gender" onChange={handleInputChange} style={{ width: "100%", padding: "8px", margin: "8px 0", border: "1px solid #ccc", borderRadius: "5px" }}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input type="number" name="income" placeholder="Annual Income (INR)" onChange={handleInputChange} style={{ width: "100%", padding: "8px", margin: "8px 0", border: "1px solid #ccc", borderRadius: "5px" }} />
                <input type="number" name="bmi" placeholder="BMI" onChange={handleInputChange} style={{ width: "100%", padding: "8px", margin: "8px 0", border: "1px solid #ccc", borderRadius: "5px" }} />
                <select name="smoking" onChange={handleInputChange} style={{ width: "100%", padding: "8px", margin: "8px 0", border: "1px solid #ccc", borderRadius: "5px" }}>
                    <option value="">Smoker?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <input type="number" name="conditions" placeholder="Pre-existing Conditions (0-3)" onChange={handleInputChange} style={{ width: "100%", padding: "8px", margin: "8px 0", border: "1px solid #ccc", borderRadius: "5px" }} />
                <input type="number" name="dependents" placeholder="Number of Dependents" onChange={handleInputChange} style={{ width: "100%", padding: "8px", margin: "8px 0", border: "1px solid #ccc", borderRadius: "5px" }} />
                <button onClick={makePrediction} style={{ width: "100%", padding: "10px", backgroundColor: "#3b82f6", color: "white", borderRadius: "5px", cursor: "pointer" }}>Predict Cost</button>
                {prediction && <h3 style={{ textAlign: "center", fontWeight: "bold", marginTop: "10px" }}>Predicted Cost: ₹{prediction}</h3>}
            </div>
        </div>
    );
};

export default MedicalInsurancePrediction;
