import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// Create lead
router.post('/', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
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
