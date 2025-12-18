import mongoose from 'mongoose';

const CMSSchema = new mongoose.Schema(
    {
        section: { type: String, required: true, unique: true },

        // Generic Title/Description/Image
        title: { type: String },
        description: { type: String },
        image: { type: String },

        // Footer Specific
        footerText: { type: String },
        copyrightText: { type: String },
        socialLinks: {
            instagram: String,
            linkedin: String,
            twitter: String,
            youtube: String,
        },

        // Contact Specific
        email: { type: String },
        phone: { type: String },
        whatsapp: { type: String },
        address: { type: String },
        googleMapEmbed: { type: String },

        // Stats Section
        stats: [{
            label: String,
            value: String,
            icon: String,
            order: { type: Number, default: 0 },
            active: { type: Boolean, default: true }
        }],

        // Generic Section Subtitle
        subtitle: { type: String },
    },
    { timestamps: true }
);

const CMS = mongoose.models.CMS || mongoose.model('CMS', CMSSchema);
export default CMS;
