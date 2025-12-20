import mongoose from 'mongoose';

const PricingSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        price: { type: mongoose.Schema.Types.Mixed, required: true },
        features: { type: [String], required: true },
        popular: { type: Boolean, default: false },
        status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    },
    { timestamps: true }
);

const Pricing = mongoose.models.Pricing || mongoose.model('Pricing', PricingSchema);
export default Pricing;
