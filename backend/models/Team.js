import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema(
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

const Team = mongoose.models.Team || mongoose.model('Team', TeamSchema);
export default Team;
