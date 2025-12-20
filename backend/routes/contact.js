import express from 'express';
import Contact from '../models/Contact.js';
import { sendEmail } from '../utils/sendEmail.js';

const router = express.Router();

// Create lead
router.post('/', async (req, res) => {
  try {
    // 1️⃣ Save contact to MongoDB first
    const contact = await Contact.create(req.body);

    // 2️⃣ Send email notification in non-blocking way (fire-and-forget)
    // Capture contact data in scope before sending response
    const emailData = {
      subject: '📩 New Contact Form Submission',
      html: `
        <h2>New Lead Received</h2>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${contact.message}</p>
      `,
    };

    // Fire-and-forget: do not await, catch errors silently
    sendEmail(emailData).catch((error) => {
      // Log email error silently - don't throw or affect response
      console.error('Email notification failed (non-blocking):', error.message);
    });

    // 3️⃣ Respond to frontend immediately after DB save
    res.status(201).json(contact);

  } catch (error) {
    console.error('Contact submit error:', error);
    res.status(500).json({ message: 'Failed to submit contact' });
  }
});

// Get leads
router.get('/', async (req, res) => {
  try {
    const leads = await Contact.find({}).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete lead
router.delete('/', async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: 'ID required' });

    await Contact.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
