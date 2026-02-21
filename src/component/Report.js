//tHUNZTR2tKyUEgqyy

import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import emailjs from '@emailjs/browser';

function Report() {
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            'service_tf9pox9',
            'template_beubgpe',
            e.target,
            'tHUNZTR2tKyUEgqyy' // Secure API key usage
        )
        .then((result) => {
            alert("Email sent successfully!");
            console.log(result.text);
        })
        .catch((error) => {
            alert("Failed to send email.");
            console.error(error.text);
        });

        e.target.reset(); // Reset the form after submission
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>REPORT ANY ISSUE/ACCOUNT</h1>
            <form style={styles.form} onSubmit={sendEmail}>
                <label style={styles.label} htmlFor="emailFrom">Your Email:</label>
                <input type="email" name="email_from" id="emailFrom" style={styles.input} placeholder="person@example.com" required/>

                <label style={styles.label} htmlFor="message">Message:</label>
                <textarea name="message" id="message" style={styles.textarea} placeholder="Write your message here..." required></textarea>

                <Button type="submit" variant="contained" endIcon={<SendIcon />} style={styles.button}>
                    Send
                </Button>
            </form>
        </div>
    );
}

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
    title: {
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#333",
    },
    form: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        width: "350px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    label: {
        fontSize: "16px",
        fontWeight: "bold",
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
        marginTop: "10px",
        backgroundColor: "#1976d2",
        color: "#fff",
        fontWeight: "bold",
        padding: "10px",
        borderRadius: "5px",
        textTransform: "none",
    }
};

export default Report;
