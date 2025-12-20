import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// Get all blogs (public - only published)
router.get('/', async (req, res) => {
    try {
        const { category, tag, limit = 50, skip = 0 } = req.query;
        
        const query = { status: 'published' };
        
        if (category) {
            query.category = category;
        }
        
        if (tag) {
            query.tags = tag;
        }
        
        const blogs = await Blog.find(query)
            .select('-content') // Don't send full content in listing
            .sort({ publishedAt: -1 })
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .lean();
        
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single blog by slug (public)
router.get('/slug/:slug', async (req, res) => {
    try {
        const blog = await Blog.findOne({ 
            slug: req.params.slug,
            status: 'published' 
        }).lean();
        
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        
        // Increment views
        await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });
        
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all blogs (admin - includes drafts)
router.get('/admin', async (req, res) => {
    try {
        const blogs = await Blog.find({})
            .sort({ createdAt: -1 })
            .lean();
        
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single blog by ID (admin)
router.get('/admin/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).lean();
        
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create blog
router.post('/', async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).json(blog);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Slug already exists' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

// Update blog
router.put('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        
        res.json(blog);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Slug already exists' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

// Delete blog
router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get categories (for filtering)
router.get('/categories', async (req, res) => {
    try {
        const categories = await Blog.distinct('category', { status: 'published' });
        res.json(categories.filter(Boolean));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get tags (for filtering)
router.get('/tags', async (req, res) => {
    try {
        const tags = await Blog.distinct('tags', { status: 'published' });
        res.json(tags.filter(Boolean));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

