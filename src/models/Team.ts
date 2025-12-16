
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITeam extends Document {
    name: string;
    role: string;
    image: string;
    bio?: string;
    order: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TeamSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        role: { type: String, required: true },
        image: { type: String, required: true },
        bio: { type: String },
        order: { type: Number, default: 0 },
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Team: Model<ITeam> = mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);

export default Team;
