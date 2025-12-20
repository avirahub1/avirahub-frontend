import express from 'express';
import Contact from '../models/Contact.js';
import { sendEmail } from '../utils/sendEmail.js';

const router = express.Router();

// Create lead
router.post('/', async (req, res) => {
  try {
    // 🔵 DEBUG: API route hit
    console.log('🔵 [CONTACT API] Route hit - POST /contact');
    
    // 🔵 DEBUG: Log request body received
    console.log('🔵 [CONTACT API] Request body received:', JSON.stringify(req.body, null, 2));

    // 1️⃣ Save contact to MongoDB first
    const contact = await Contact.create(req.body);

    // ✅ DEBUG: MongoDB save successful
    console.log('✅ [CONTACT API] MongoDB save successful - Contact ID:', contact._id);

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

    // 📧 DEBUG: About to call sendEmail function
    console.log('📧 [CONTACT API] Calling sendEmail() function (non-blocking)...');
    console.log('📧 [CONTACT API] Email data prepared:', {
      subject: emailData.subject,
      recipient: process.env.ADMIN_EMAIL || 'NOT SET',
      hasHtml: !!emailData.html
    });

    // Fire-and-forget: do not await, catch errors silently
    sendEmail(emailData)
      .then(() => {
        // ✅ DEBUG: Email sent successfully
        console.log('✅ [CONTACT API] Email sent successfully via sendEmail()');
      })
      .catch((error) => {
        // ❌ DEBUG: Email error logged
        console.error('❌ [CONTACT API] Email notification failed (non-blocking):', error.message);
        console.error('❌ [CONTACT API] Email error details:', error);
      });

    // 3️⃣ Respond to frontend immediately after DB save
    console.log('✅ [CONTACT API] Returning success response to frontend');
    res.status(201).json({ success: true });

  } catch (error) {
    // ❌ DEBUG: General error
    console.error('❌ [CONTACT API] Contact submit error:', error);
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
