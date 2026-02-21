import React, { useState } from "react";
import emailjs from "emailjs-com";
import CryptoJS from "crypto-js";
import { PDFDocument } from "pdf-lib";

const Contact = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedFile, setDecryptedFile] = useState("");

  // 🔒 Encrypt PDF File (AES-256)
  const encryptPDF = (file, password) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const encrypted = CryptoJS.AES.encrypt(reader.result, password).toString();
        resolve(encrypted);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // 📤 Send Encrypted PDF via EmailJS
  const sendEmail = async (encryptedFile) => {
    if (!recipientEmail) {
      alert("Please enter recipient email.");
      return;
    }

    const templateParams = {
      to_email: recipientEmail,
      subject: "Secure Encrypted PDF",
      message: encryptedFile,
    };

    try {
      await emailjs.send(
        "service_e5ilosj",
        "template_sisepsf",
        templateParams,
        "bRF8qnmwpqDM2jXCj"
      );
      alert("Email Sent Successfully!");
    } catch (error) {
      console.error("Error Sending Email:", error);
      alert("Failed to send email.");
    }
  };

  // 📥 Encrypt & Send Function
  const handleEncryptAndSend = async () => {
    if (!file || !password) {
      alert("Please select a file and enter a password.");
      return;
    }

    try {
      const encryptedFile = await encryptPDF(file, password);
      setEncryptedText(encryptedFile);
      await sendEmail(encryptedFile);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 🔓 Decrypt the PDF File
  const decryptPDF = (encryptedText, password) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, password);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedData) throw new Error("Invalid Password or Corrupted Data.");

      const byteCharacters = atob(decryptedData.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      const pdfURL = URL.createObjectURL(blob);
      setDecryptedFile(pdfURL);
    } catch (error) {
      alert("Decryption failed. Check password or data.");
      console.error("Decryption Error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🔐 Secure PDF Email</h2>

      <div style={styles.formGroup}>
        <label style={styles.label}>Upload PDF:</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} style={styles.input} />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Encryption Password:</label>
        <input type="password" placeholder="Enter Encryption Password" onChange={(e) => setPassword(e.target.value)} style={styles.input} />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Recipient Email:</label>
        <input type="email" placeholder="Enter Recipient Email" onChange={(e) => setRecipientEmail(e.target.value)} style={styles.input} />
      </div>

      <button onClick={handleEncryptAndSend} style={styles.button}>Encrypt & Send</button>

      <hr style={styles.divider} />

      <h3 style={styles.heading}>🔓 Decrypt PDF</h3>

      <div style={styles.formGroup}>
        <label style={styles.label}>Paste Encrypted Text:</label>
        <textarea placeholder="Paste Encrypted PDF Here" rows="4" onChange={(e) => setEncryptedText(e.target.value)} style={styles.textarea} />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Decryption Password:</label>
        <input type="password" placeholder="Enter Decryption Password" onChange={(e) => setPassword(e.target.value)} style={styles.input} />
      </div>

      <button onClick={() => decryptPDF(encryptedText, password)} style={styles.button}>Decrypt</button>

      {decryptedFile && (
        <div style={styles.result}>
          <h4>📄 Decrypted PDF:</h4>
          <a href={decryptedFile} target="_blank" rel="noopener noreferrer" style={styles.link}>Open PDF</a>
        </div>
      )}
    </div>
  );
};

// Internal CSS styles
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
    },
    heading: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "15px",
        color: "#333",
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "15px",
        width: "100%",
        maxWidth: "400px",
    },
    label: {
        fontSize: "16px",
        fontWeight: "bold",
        marginBottom: "5px",
        color: "#555",
    },
    input: {
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        outline: "none",
    },
    textarea: {
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        minHeight: "100px",
        outline: "none",
        resize: "none",
    },
    button: {
        width: "100%",
        maxWidth: "400px",
        padding: "10px",
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: "#1976d2",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px",
        transition: "background 0.3s ease",
    },
    buttonHover: {
        backgroundColor: "#135ba1",
    },
    divider: {
        width: "100%",
        maxWidth: "400px",
        margin: "20px 0",
        border: "1px solid #ccc",
    },
    result: {
        marginTop: "20px",
        textAlign: "center",
    },
    link: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#1976d2",
        textDecoration: "none",
        marginTop: "10px",
    },
};

export default Contact;
