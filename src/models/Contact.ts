import mongoose, { Schema, Model, Document } from 'mongoose';

export interface ContactDocument extends Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: Date;
}

const ContactSchema = new Schema<ContactDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

const Contact: Model<ContactDocument> =
  mongoose.models.Contact || mongoose.model<ContactDocument>('Contact', ContactSchema);

export default Contact;

