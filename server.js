const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');

const app = express();
const PORT = 3000;
const feedbackFilePath = path.join(__dirname, 'feedback.xlsx');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit-feedback', (req, res) => {
    const { name, remarks } = req.body;

    // Save feedback to Excel file
    let workbook;
    if (fs.existsSync(feedbackFilePath)) {
        workbook = XLSX.readFile(feedbackFilePath);
    } else {
        workbook = XLSX.utils.book_new();
    }

    let worksheet = workbook.Sheets['Feedback'];
    if (!worksheet) {
        worksheet = XLSX.utils.json_to_sheet([]);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Feedback');
    }

    XLSX.utils.sheet_add_json(worksheet, [{ Name: name, Remarks: remarks }], { skipHeader: true, origin: -1 });
    XLSX.writeFile(workbook, feedbackFilePath);

    // Send feedback via email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bibirojina134@gmail.com', // Replace with your email
            pass: 'R.B.915307'   // Replace with your email password
        }
    });

    const mailOptions = {
        from: 'bibirojina134@gmail.com', // Replace with your email
        to: 'robocraft130@gmail.com', // Replace with the recipient's email
        subject: 'New Feedback Received',
        text: `Name: ${name}\nRemarks: ${remarks}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending email', error });
        }
        res.json({ message: 'Feedback submitted successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
