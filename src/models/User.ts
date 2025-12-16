import mongoose, { Schema, Model, Document } from 'mongoose';

export type UserRole = 'admin' | 'user';

export interface UserDocument extends Document {
  email: string;
  password: string;
  role: UserRole;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'admin' },
  },
  {
    timestamps: true,
  },
);

const User: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);

export default User;

