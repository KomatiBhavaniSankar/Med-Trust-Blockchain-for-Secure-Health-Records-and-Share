import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as dfd from 'danfojs';
import patientData from './data';
import { create, all } from 'mathjs';

const math = create(all);

const RiskPredictor = () => {
    const [age, setAge] = useState("");
    const [bmi, setBmi] = useState("");
    const [bloodPressure, setBloodPressure] = useState("");
    const [cholesterol, setCholesterol] = useState("");
    const [predictions, setPredictions] = useState([]);
    const [model, setModel] = useState(null);

    const diseases = ["Hypertension", "Diabetes", "Heart Disease"];

    useEffect(() => {
        const trainModel = async () => {
            const newModel = tf.sequential();
            newModel.add(tf.layers.dense({ units: 16, inputShape: [4], activation: "relu" }));
            newModel.add(tf.layers.dense({ units: 12, activation: "relu" }));
            newModel.add(tf.layers.dense({ units: diseases.length, activation: "softmax" }));

            newModel.compile({ optimizer: "adam", loss: "categoricalCrossentropy", metrics: ["accuracy"] });

            const df = new dfd.DataFrame(patientData);
            const trainX = tf.tensor2d(df.loc({ columns: ["age", "bmi", "bp", "cholesterol"] }).values);
            const trainY = tf.tensor2d(df.loc({ columns: ["hypertension", "diabetes", "heart_disease"] }).values);

            await newModel.fit(trainX, trainY, { epochs: 100 });
            setModel(newModel);
        };

        trainModel();
    }, []);

    const predictDisease = async () => {
        if (age && bmi && bloodPressure && cholesterol && model) {
            const inputTensor = tf.tensor2d([[parseFloat(age), parseFloat(bmi), parseFloat(bloodPressure), parseFloat(cholesterol)]]);
            const predictionTensor = model.predict(inputTensor);
            const predictionArray = await predictionTensor.data();

            const results = diseases.map((disease, index) => ({
                name: disease,
                probability: math.round(predictionArray[index] * 100, 2)
            }));
            setPredictions(results);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>🩺 Disease Prediction</h2>
                <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                <input type="number" placeholder="BMI" value={bmi} onChange={(e) => setBmi(e.target.value)} />
                <input type="number" placeholder="Blood Pressure" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} />
                <input type="number" placeholder="Cholesterol" value={cholesterol} onChange={(e) => setCholesterol(e.target.value)} />
                <button onClick={predictDisease}>Predict Disease</button>

                {predictions.length > 0 && (
                    <div>
                        <h3>Prediction Results:</h3>
                        <ul>
                            {predictions.map((p, index) => (
                                <li key={index}>{p.name}: {p.probability}%</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <style jsx>{`
                .container {
                    max-width: 500px;
                    margin: auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    background: white;
                }
                .card {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                input {
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    margin-bottom: 10px;
                }
                button {
                    padding: 10px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                button:hover {
                    background-color: #0056b3;
                }
            `}</style>
        </div>
    );
};

export default RiskPredictor;
