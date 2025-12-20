import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
    {
        // Basic Blog Fields
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true, lowercase: true },
        featuredImage: { type: String },
        content: { type: String, required: true }, // HTML content
        
        // Categorization
        category: { type: String },
        tags: [{ type: String }],
        
        // Publishing
        status: { type: String, enum: ['draft', 'published'], default: 'draft' },
        publishedAt: { type: Date },
        
        // SEO Fields
        metaTitle: { type: String },
        metaDescription: { type: String },
        seoKeywords: [{ type: String }],
        canonicalUrl: { type: String },
        
        // Open Graph Tags
        ogTitle: { type: String },
        ogDescription: { type: String },
        ogImage: { type: String },
        
        // Structured Data (JSON-LD)
        structuredData: { type: mongoose.Schema.Types.Mixed },
        
        // Reading time (auto-calculated or manual)
        readingTime: { type: Number }, // in minutes
        
        // Internal linking
        relatedBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
        
        // Analytics
        views: { type: Number, default: 0 },
    },
    { timestamps: true }
);

// Index for faster queries
BlogSchema.index({ slug: 1 });
BlogSchema.index({ status: 1, publishedAt: -1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ tags: 1 });

// Auto-set publishedAt when status changes to published
BlogSchema.pre('save', function(next) {
    if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
        this.publishedAt = new Date();
    }
    next();
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
export default Blog;

