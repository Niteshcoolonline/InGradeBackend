const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; // Or any other port you prefer

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to send emails
app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    // Configure nodemailer with Gmail SMTP
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'niteshcoolonline@gmail.com', // Your Gmail address
            pass: 'Nitesh@93550' // Your Gmail password (use environment variable instead)
        }
    });

    // Email message options
    let mailOptions = {
        from: 'niteshcoolonline@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    try {
        // Send mail with defined transport object
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (err) {
        console.log('Error occurred: ' + err.message);
        res.status(500).json({ message: 'Failed to send email' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});