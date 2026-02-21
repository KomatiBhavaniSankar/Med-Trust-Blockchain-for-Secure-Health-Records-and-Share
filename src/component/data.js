const patientData = [
    { age: 45, bmi: 25.3, bp: 130, cholesterol: 200, hypertension: 1, diabetes: 0, heart_disease: 0 },
    { age: 60, bmi: 30.1, bp: 145, cholesterol: 220, hypertension: 1, diabetes: 1, heart_disease: 0 },
    { age: 50, bmi: 28.2, bp: 135, cholesterol: 190, hypertension: 0, diabetes: 1, heart_disease: 0 },
    { age: 65, bmi: 29.5, bp: 160, cholesterol: 240, hypertension: 1, diabetes: 0, heart_disease: 1 },
    { age: 35, bmi: 23.0, bp: 120, cholesterol: 180, hypertension: 0, diabetes: 0, heart_disease: 0 },
    { age: 55, bmi: 32.2, bp: 150, cholesterol: 230, hypertension: 1, diabetes: 1, heart_disease: 1 },
    { age: 40, bmi: 26.4, bp: 128, cholesterol: 195, hypertension: 0, diabetes: 0, heart_disease: 0 },
    { age: 70, bmi: 31.0, bp: 170, cholesterol: 250, hypertension: 1, diabetes: 1, heart_disease: 1 },
    { age: 30, bmi: 24.0, bp: 118, cholesterol: 170, hypertension: 0, diabetes: 0, heart_disease: 0 },
    { age: 50, bmi: 27.0, bp: 140, cholesterol: 210, hypertension: 1, diabetes: 0, heart_disease: 1 },

    ...Array.from({ length: 90 }, (_, i) => ({
        age: Math.floor(Math.random() * 51) + 20, // Age between 20 and 70
        bmi: parseFloat((Math.random() * 15 + 18).toFixed(1)), // BMI between 18.0 and 33.0
        bp: Math.floor(Math.random() * 61) + 100, // Blood pressure between 100 and 160
        cholesterol: Math.floor(Math.random() * 101) + 150, // Cholesterol between 150 and 250
        hypertension: Math.random() < 0.4 ? 1 : 0, // 40% chance of hypertension
        diabetes: Math.random() < 0.3 ? 1 : 0, // 30% chance of diabetes
        heart_disease: Math.random() < 0.2 ? 1 : 0 // 20% chance of heart disease
    }))
];

export default patientData;
