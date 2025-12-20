import express from 'express';
import Pricing from '../models/Pricing.js';

const router = express.Router();

// Get all plans
router.get('/', async (req, res) => {
    try {
        const plans = await Pricing.find({}).sort({ createdAt: -1 });
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create
router.post('/', async (req, res) => {
    try {
        const plan = new Pricing(req.body);
        await plan.save();
        res.status(201).json(plan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update
router.put('/', async (req, res) => {
    try {
        const { _id, ...updateData } = req.body;
        const plan = await Pricing.findByIdAndUpdate(_id, updateData, { new: true });
        res.json(plan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete
router.delete('/', async (req, res) => {
    try {
        const { id } = req.query;
        await Pricing.findByIdAndDelete(id);
        res.json({ message: 'Plan deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
