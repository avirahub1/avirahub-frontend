import express from 'express';
import Team from '../models/Team.js';

const router = express.Router();

// Get all team members
router.get('/', async (req, res) => {
    try {
        // Sort by order by default
        const members = await Team.find({ active: true }).sort({ order: 1 });
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin: Get all (including inactive)
router.get('/admin', async (req, res) => {
    try {
        const members = await Team.find({}).sort({ order: 1 });
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add member
router.post('/', async (req, res) => {
    try {
        const member = new Team(req.body);
        await member.save();
        res.status(201).json(member);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update member
router.put('/:id', async (req, res) => {
    try {
        const member = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(member);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete member
router.delete('/:id', async (req, res) => {
    try {
        await Team.findByIdAndDelete(req.params.id);
        res.json({ message: 'Member deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
