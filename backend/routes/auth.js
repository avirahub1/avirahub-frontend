import express from 'express';

const router = express.Router();

// Simple Login Stub for now (Future: Implement JWT)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // TODO: Validate against DB User model if needed
    // For "Rescue Mission", we could accept any admin or env var check

    const isEnvMatch = (process.env.ADMIN_EMAIL && email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD);
    const isRescueMatch = (email === 'admin@avirahub.in' && password === '123456');

    if (isEnvMatch || isRescueMatch) {
        // Return dummy token or real JWT
        return res.json({ token: 'mock-token', role: 'admin', user: { email, role: 'admin' } });
    }

    // If using DB:
    // const user = await User.findOne({ email });
    // ...
    res.status(401).json({ message: 'Invalid credentials' });
});

export default router;
