const express = require('express');
const sgMail = require('@sendgrid/mail');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Contact form submission endpoint
app.post('/send-email', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                success: false, 
                error: 'All fields are required' 
            });
        }

        // Log the contact form submission
        const timestamp = new Date().toISOString();
        console.log('\n=== NEW CONTACT FORM SUBMISSION ===');
        console.log(`Timestamp: ${timestamp}`);
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Subject: ${subject}`);
        console.log(`Message: ${message}`);
        console.log(`Your contact email: imtiazmahmudemon7@gmail.com`);
        console.log('=====================================\n');

        // For now, just return success since SendGrid needs verification
        // You can manually check the server logs to see contact form submissions
        res.json({ 
            success: true, 
            message: 'Message received successfully! I will get back to you soon.' 
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to process message. Please try again later.' 
        });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running on port ${PORT}`);
});