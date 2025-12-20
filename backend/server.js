import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import cmsRoutes from './routes/cms.js';
import teamRoutes from './routes/team.js';
import contactRoutes from './routes/contact.js';
import authRoutes from './routes/auth.js';
import pricingRoutes from './routes/pricing.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Secure CORS (Production Safe)
app.use(
    cors({
        origin: [
            'https://avirahub.in',
            'https://www.avirahub.in',
            'http://localhost:3000'
        ],
        credentials: true
    })
);

app.use(express.json());

// Routes
app.use('/api/cms', cmsRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/pricing', pricingRoutes);

// Health check
app.get('/', (req, res) => {
    res.status(200).send('Avira Hub Backend is running');
});

// ✅ Connect DB then start server (IMPORTANT)
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Render ko clear failure signal
    });
