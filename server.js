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

// Email sending endpoint
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

        // Email to portfolio owner
        const msg = {
            to: 'mahmud241-35-347@diu.edu.bd',
            from: 'noreply@portfolio.com', // This should be a verified sender in SendGrid
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #667EEA;">New Message from Portfolio Contact Form</h2>
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                    </div>
                    <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #667EEA; margin: 20px 0;">
                        <h3>Message:</h3>
                        <p style="line-height: 1.6;">${message}</p>
                    </div>
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                    <p style="color: #666; font-size: 14px;">
                        This message was sent from your portfolio website contact form.
                    </p>
                </div>
            `
        };

        // Auto-reply to sender
        const autoReply = {
            to: email,
            from: 'noreply@portfolio.com',
            subject: 'Thank you for contacting Imtiaz Mahmud',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #667EEA;">Thank you for your message!</h2>
                    <p>Dear ${name},</p>
                    <p>Thank you for reaching out through my portfolio website. I have received your message and will get back to you as soon as possible.</p>
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Your message:</strong></p>
                        <p style="font-style: italic;">"${message}"</p>
                    </div>
                    <p>Best regards,<br><strong>Imtiaz Mahmud</strong><br>App Developer</p>
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                    <p style="color: #666; font-size: 12px;">
                        This is an automated response. Please do not reply to this email.
                    </p>
                </div>
            `
        };

        // Send both emails
        await sgMail.send(msg);
        await sgMail.send(autoReply);

        res.json({ 
            success: true, 
            message: 'Email sent successfully' 
        });

    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to send email. Please try again later.' 
        });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running on port ${PORT}`);
});