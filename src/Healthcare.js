// const contractAddress = "0xba3786e99f4d8d16619d03bf26be646c09b84daa";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { jsPDF } from "jspdf"; // Import jsPDF
import "./App.css";

const Healthcare = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [patientName, setPatientName] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [treatment, setTreatment] = useState("");
    const [patientRecords, setPatientRecords] = useState([]);
    const [recordID, setRecordID] = useState("");
    const [searchDiagnosis, setSearchDiagnosis] = useState("");
    const [singleRecord, setSingleRecord] = useState(null);

    const contractAddress = "0x9023798e139a8643f10709d882967fd1923f978d";
    const contractABI = [
        {
            "inputs": [
                { "internalType": "string", "name": "patientName", "type": "string" },
                { "internalType": "string", "name": "diagnosis", "type": "string" },
                { "internalType": "string", "name": "treatment", "type": "string" }
            ],
            "name": "addRecord",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getPatientRecords",
            "outputs": [
                {
                    "components": [
                        { "internalType": "uint256", "name": "recordID", "type": "uint256" },
                        { "internalType": "string", "name": "patientName", "type": "string" },
                        { "internalType": "string", "name": "diagnosis", "type": "string" },
                        { "internalType": "string", "name": "treatment", "type": "string" },
                        { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
                    ],
                    "internalType": "struct HealthcareRecords.Record[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    // Blacklisted addresses
    const blacklistedAccounts = [
        "".toLowerCase() // Ensure case-insensitive match
    ];

    useEffect(() => {
        const connectWallet = async () => {
            if (!window.ethereum) {
                alert("Please install MetaMask to use this app.");
                return;
            }

            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const account = await signer.getAddress();

                // Check if the connected account is blacklisted
                if (blacklistedAccounts.includes(account.toLowerCase())) {
                    alert("⚠️ You have been blacklisted and cannot access this DApp.");
                    return;
                }

                setProvider(provider);
                setSigner(signer);
                setAccount(account);

                const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
                setContract(contractInstance);
            } catch (error) {
                console.error("Error connecting to wallet: ", error);
            }
        };

        connectWallet();
    }, []);

    const fetchPatientRecords = async () => {
        if (!contract) {
            alert("Contract not connected. Please try again.");
            return;
        }

        try {
            const records = await contract.getPatientRecords();
            setPatientRecords(records);
        } catch (error) {
            console.error("Error fetching patient records", error);
            alert("Failed to fetch records.");
        }
    };

    const addRecord = async () => {
        if (!contract) {
            alert("Contract not loaded. Please connect to MetaMask.");
            return;
        }

        if (!patientName || !diagnosis || !treatment) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const tx = await contract.addRecord(patientName, diagnosis, treatment);
            await tx.wait();
            alert("Record added successfully!");
            fetchPatientRecords();
        } catch (error) {
            console.error("Error adding records", error);
            alert("Failed to add record.");
        }
    };

    // Fetch record by ID
    const fetchRecordByID = async () => {
        if (!contract || !recordID) {
            alert("Please enter a valid Record ID.");
            return;
        }

        try {
            // Fetch all records from the contract
            const records = await contract.getPatientRecords();
            
            // Find the record with the matching ID
            const record = records.find((record) => record.recordID.toString() === recordID);
            
            if (record) {
                setSingleRecord(record);
            } else {
                alert("Record not found.");
            }
        } catch (error) {
            console.error("Error fetching record by ID", error);
            alert("Failed to fetch record.");
        }
    };

    // Fetch record by diagnosis
    const fetchRecordByDiagnosis = async () => {
        if (!contract || !searchDiagnosis) {
            alert("Please enter a valid Diagnosis.");
            return;
        }

        try {
            // Fetch all records from the contract
            const records = await contract.getPatientRecords();

            // Find the record(s) with the matching diagnosis
            const record = records.find((record) => record.diagnosis.toLowerCase() === searchDiagnosis.toLowerCase());
            
            if (record) {
                setSingleRecord(record);
            } else {
                alert("Record not found for the given diagnosis.");
            }
        } catch (error) {
            console.error("Error fetching record by diagnosis", error);
            alert("Failed to fetch record.");
        }
    };

    // Function to generate and download the PDF for all fetched patient records
    const downloadAllRecordsPDF = () => {
        if (patientRecords.length === 0) {
            alert("No records found to download.");
            return;
        }

        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("All Patient Records", 14, 22);

        doc.setFontSize(12);
        patientRecords.forEach((record, index) => {
            const yOffset = 30 + index * 60;
            doc.text(`Record ID: ${record.recordID.toString()}`, 14, yOffset);
            doc.text(`Patient Name: ${record.patientName}`, 14, yOffset + 10);
            doc.text(`Diagnosis: ${record.diagnosis}`, 14, yOffset + 20);
            doc.text(`Treatment: ${record.treatment}`, 14, yOffset + 30);
            doc.text(`Timestamp: ${new Date(record.timestamp.toNumber() * 1000).toLocaleString()}`, 14, yOffset + 40);
        });

        doc.save("all_records.pdf");
    };

    // Function to generate and download the PDF for fetched record by ID
    const downloadRecordByIDPDF = () => {
        if (!singleRecord) {
            alert("No record found to download.");
            return;
        }

        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Patient Record by ID", 14, 22);

        doc.setFontSize(12);
        doc.text(`Record ID: ${singleRecord.recordID.toString()}`, 14, 30);
        doc.text(`Patient Name: ${singleRecord.patientName}`, 14, 40);
        doc.text(`Diagnosis: ${singleRecord.diagnosis}`, 14, 50);
        doc.text(`Treatment: ${singleRecord.treatment}`, 14, 60);
        doc.text(`Timestamp: ${new Date(singleRecord.timestamp.toNumber() * 1000).toLocaleString()}`, 14, 70);

        doc.save("record_by_id.pdf");
    };

    // Function to generate and download the PDF for fetched record by diagnosis
    const downloadRecordByDiagnosisPDF = () => {
        if (!singleRecord) {
            alert("No record found to download.");
            return;
        }

        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Patient Record by Diagnosis", 14, 22);

        doc.setFontSize(12);
        doc.text(`Record ID: ${singleRecord.recordID.toString()}`, 14, 30);
        doc.text(`Patient Name: ${singleRecord.patientName}`, 14, 40);
        doc.text(`Diagnosis: ${singleRecord.diagnosis}`, 14, 50);
        doc.text(`Treatment: ${singleRecord.treatment}`, 14, 60);
        doc.text(`Timestamp: ${new Date(singleRecord.timestamp.toNumber() * 1000).toLocaleString()}`, 14, 70);

        doc.save("record_by_diagnosis.pdf");
    };

    return (
        <div className="container">
            <h1 className="title"> DApp (SepoliaETH)</h1>
            {account ? <p className="account-info">Connected Account: {account}</p> : <p>Please connect MetaMask.</p>}

            <div className="form-section">
                <h2>Add  Record</h2>
                <input
                    className="input-field"
                    type="text"
                    placeholder="Patient Name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                />
                <input
                    className="input-field"
                    type="text"
                    placeholder="Diagnosis"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                />
                <input
                    className="input-field"
                    type="text"
                    placeholder="Treatment"
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                />
                <button className="action-button" onClick={addRecord}>
                    Add Record
                </button>
            </div>

            <div className="records-section">
                <h2>Patient Records</h2>
                <button className="action-button" onClick={fetchPatientRecords}>
                    Fetch Records
                </button>
                {patientRecords.length > 0 ? (
                    <div>
                        {patientRecords.map((record, index) => (
                            <div key={index}>
                                <p>Record ID: {record.recordID.toString()}</p>
                                <p>Patient Name: {record.patientName}</p>
                                <p>Diagnosis: {record.diagnosis}</p>
                                <p>Treatment: {record.treatment}</p>
                                <p>Timestamp: {new Date(record.timestamp.toNumber() * 1000).toLocaleString()}</p>
                            </div>
                        ))}
                        <button className="action-button" onClick={downloadAllRecordsPDF}>
                            Download All Records as PDF
                        </button>
                    </div>
                ) : (
                    <p>No records found.</p>
                )}
            </div>

            <div className="search-section">
                <h3>Search Record by ID</h3>
                <input
                    className="input-field"
                    type="number"
                    placeholder="Enter Record ID"
                    value={recordID}
                    onChange={(e) => setRecordID(e.target.value)}
                />
                <button className="action-button" onClick={fetchRecordByID}>
                    Search by ID
                </button>
                <button className="action-button" onClick={downloadRecordByIDPDF}>
                    Download Record by ID as PDF
                </button>

                <h3>Search Record by Diagnosis</h3>
                <input
                    className="input-field"
                    type="text"
                    placeholder="Enter Diagnosis"
                    value={searchDiagnosis}
                    onChange={(e) => setSearchDiagnosis(e.target.value)}
                />
                <button className="action-button" onClick={fetchRecordByDiagnosis}>
                    Search by Diagnosis
                </button>
                <button className="action-button" onClick={downloadRecordByDiagnosisPDF}>
                    Download Record by Diagnosis as PDF
                </button>
            </div>
        </div>
    );
};

export default Healthcare;
