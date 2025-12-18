import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String },
        message: { type: String, required: true },
        status: { type: String, enum: ['new', 'read', 'archived'], default: 'new' },
    },
    { timestamps: true }
);

const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
export default Contact;
