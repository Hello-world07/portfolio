const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5001; // Using 5001 to avoid conflict with port 5000
const submissionsFile = path.join(__dirname, 'submissions.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load existing submissions
const loadSubmissions = async () => {
  try {
    const data = await fs.readFile(submissionsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, create it
      await fs.writeFile(submissionsFile, '[]');
      return [];
    }
    throw error;
  }
};

// Save submissions
const saveSubmissions = async (submissions) => {
  await fs.writeFile(submissionsFile, JSON.stringify(submissions, null, 2));
};

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pranithkondakp@gmail.com', // Replace with your Gmail address
    pass: 'mkow orhm wcfl iqxc',    // Replace with your App Password or password
  },
});

// Handle form submission
app.post('/api/contact', async (req, res) => {
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
    const submissions = await loadSubmissions();
    submissions.push({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
    });
    await saveSubmissions(submissions);

    // Send email
    const mailOptions = {
      from: 'your-email@gmail.com', // Sender address (same as auth.user)
      to: 'pranithkondakp@gmail.com',   // Replace with the email where you want to receive messages
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nTimestamp: ${new Date().toISOString()}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error saving submission or sending email:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});