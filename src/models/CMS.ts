
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICMS extends Document {
    section: 'about' | 'footer' | 'contact';

    // About Page
    title?: string;
    description?: string;
    image?: string;

    // Footer
    footerText?: string;
    copyrightText?: string;
    socialLinks?: {
        instagram?: string;
        linkedin?: string;
        twitter?: string;
        youtube?: string;
    };

    // Contact Info
    email?: string;
    phone?: string;
    whatsapp?: string;
    address?: string;
    googleMapEmbed?: string;

    // Stats Section (Trusted by Best)
    stats?: {
        label: string;
        value: string;
        icon: string; // Store icon name (e.g., 'Users', 'Briefcase')
        order?: number;
        active?: boolean;
    }[];

    // Generic Section Subtitle (Used by Stats, Team Header)
    subtitle?: string;

    updatedAt: Date;
    createdAt: Date;
}

const CMSSchema: Schema = new Schema(
    {
        section: { type: String, required: true, unique: true },

        // Generic Title/Description/Image (Used by About Hero, etc.)
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

        // Stats Section (Trusted by Best)
        stats: [{
            label: String,
            value: String,
            icon: String, // Store icon name (e.g., 'Users', 'Briefcase')
            order: { type: Number, default: 0 },
            active: { type: Boolean, default: true }
        }],

        // Generic Section Subtitle (Used by Stats, Team Header)
        subtitle: { type: String },
    },
    { timestamps: true }
);

const CMS: Model<ICMS> = mongoose.models.CMS || mongoose.model<ICMS>('CMS', CMSSchema);

export default CMS;
