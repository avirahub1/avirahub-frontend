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

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/cms', cmsRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/pricing', pricingRoutes);

// Base route
app.get('/', (req, res) => {
    res.send('Avira Hub Backend is running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
