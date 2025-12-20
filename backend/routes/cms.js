import express from 'express';
import CMS from '../models/CMS.js';

const router = express.Router();

// Get CMS data for a section
router.get('/', async (req, res) => {
    try {
        const { section } = req.query;
        if (!section) {
            // If no section provided, maybe return all? Or error.
            // For now, let's return all to be safe, or specific.
            const allData = await CMS.find({});
            return res.json(allData);
        }
        const data = await CMS.findOne({ section });
        res.json(data || {});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update CMS data
router.post('/', async (req, res) => {
    try {
        const { section, ...updateData } = req.body;
        if (!section) {
            return res.status(400).json({ message: 'Section is required' });
        }

        const data = await CMS.findOneAndUpdate(
            { section },
            { $set: updateData },
            { new: true, upsert: true }
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
