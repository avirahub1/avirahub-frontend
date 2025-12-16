
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPricing extends Document {
  title: string;
  price: string | number;
  features: string[];
  popular: boolean;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const PricingSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Schema.Types.Mixed, required: true }, // Can be string "Custom" or number
    features: { type: [String], required: true },
    popular: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

const Pricing: Model<IPricing> = mongoose.models.Pricing || mongoose.model<IPricing>('Pricing', PricingSchema);

export default Pricing;
