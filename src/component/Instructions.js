import React from "react";

const Instructions = () => {
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      textAlign: "center",
      fontSize: "2.5rem",
      marginBottom: "20px",
      color: "#4a90e2",
    },
    step: {
      marginBottom: "20px",
    },
    stepTitle: {
      fontSize: "1.8rem",
      color: "#333",
    },
    stepText: {
      fontSize: "1rem",
      color: "#555",
    },
    list: {
      paddingLeft: "20px",
    },
    listItem: {
      fontSize: "1rem",
    },
    footer: {
      textAlign: "center",
      fontSize: "0.9rem",
      color: "#888",
      marginTop: "30px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>How to Use the Healthcare DApp</h1>

      <section style={styles.step}>
        <h2 style={styles.stepTitle}>1. Connect Your Wallet</h2>
        <p style={styles.stepText}>
          To use the app, you first need to connect your Ethereum wallet (e.g., MetaMask) to the application. Click the "Connect Wallet" button on the homepage. You will be prompted to approve the connection in your wallet.
        </p>
      </section>

      <section style={styles.step}>
        <h2 style={styles.stepTitle}>2. Add a Patient Record</h2>
        <p style={styles.stepText}>
          After connecting your wallet, you can add a patient record by filling in the following fields:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}><strong>Patient Name:</strong> Enter the name of the patient.</li>
          <li style={styles.listItem}><strong>Diagnosis:</strong> Enter the diagnosis for the patient.</li>
          <li style={styles.listItem}><strong>Treatment:</strong> Enter the prescribed treatment.</li>
        </ul>
        <p style={styles.stepText}>Once you've filled in the fields, click the "Add Record" button to submit the record to the blockchain.</p>
      </section>

      <section style={styles.step}>
        <h2 style={styles.stepTitle}>3. Fetch Patient Records</h2>
        <p style={styles.stepText}>
          To view all patient records, click the "Fetch Records" button. This will retrieve all stored records from the blockchain and display them on the page.
        </p>
      </section>

      <section style={styles.step}>
        <h2 style={styles.stepTitle}>4. Search for a Record by ID</h2>
        <p style={styles.stepText}>
          If you're looking for a specific patient record, you can search by Record ID. Enter the Record ID in the search box and click the "Search by ID" button to retrieve the record.
        </p>
      </section>

      <section style={styles.step}>
        <h2 style={styles.stepTitle}>5. Search for a Record by Diagnosis</h2>
        <p style={styles.stepText}>
          You can also search for records by Diagnosis. Enter the diagnosis in the search box and click the "Search by Diagnosis" button to retrieve all records matching that diagnosis.
        </p>
      </section>

      <section style={styles.step}>
        <h2 style={styles.stepTitle}>6. Download Records as PDF</h2>
        <p style={styles.stepText}>
          You can download the patient records as a PDF. To download all records, click the "Download All Records as PDF" button. To download a single record, use the "Download Record by ID" or "Download Record by Diagnosis" buttons.
        </p>
      </section>

      <footer style={styles.footer}>
        <p>Note: Make sure you're using the Sepolia Ethereum test network.</p>
        <p>If you have any issues, feel free to reach out to the support team!</p>
      </footer>
    </div>
  );
};

export default Instructions;
