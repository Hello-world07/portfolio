const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env for local development

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load existing submissions
const loadSubmissions = async () => {
  const submissionsFile = path.join(__dirname, '../submissions.json');
  try {
    const data = await fs.readFile(submissionsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(submissionsFile, '[]');
      return [];
    }
    throw error;
  }
};

// Save submissions
const saveSubmissions = async (submissions) => {
  const submissionsFile = path.join(__dirname, '../submissions.json');
  await fs.writeFile(submissionsFile, JSON.stringify(submissions, null, 2));
};

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Gmail address from environment variable
    pass: process.env.EMAIL_PASS, // App password from environment variable
  },
});

// Handle form submission
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Server-side validation
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!email || !email.trim()) {
    return res.status(400).json({ error: 'Email is required' });
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }
  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }
  if (message.length > 500) {
    return res.status(400).json({ error: 'Message exceeds 500 characters' });
  }

  try {
    // Optional: Attempt to save to submissions.json (non-critical on Vercel)
    try {
      const submissions = await loadSubmissions();
      submissions.push({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        timestamp: new Date().toISOString(),
      });
      await saveSubmissions(submissions);
    } catch (fileError) {
      console.error('Failed to save to submissions.json:', fileError);
      // Continue without failing the request
    }

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: process.env.EMAIL_USER,   // Recipient (change to desired email if different)
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nTimestamp: ${new Date().toISOString()}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = app;

// Optional: Add local server for testing (remove or comment out for Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}