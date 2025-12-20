# Blog System - Quick Setup Guide

## Environment Variables

Add these to your `.env.local` file (frontend) and `.env` file (backend):

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://avirahub-backend.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://avirahub.in
```

### Backend (.env)
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
ADMIN_EMAIL=your_admin_email@example.com
ADMIN_PASSWORD=your_secure_password
```

## Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 2. Frontend Setup
```bash
npm install
npm run dev
```

### 3. Access Admin Panel
1. Go to `http://localhost:3000/login`
2. Login with admin credentials
3. Click **"Blog Management"** tab
4. Create your first blog!

## Testing

### Test Blog Creation
1. Create a test blog with:
   - Title: "Test Blog Post"
   - Slug: "test-blog-post"
   - Content: `<h1>Hello World</h1><p>This is a test blog post.</p>`
   - Status: Published

2. Visit: `http://localhost:3000/blog/test-blog-post`

3. Check SEO:
   - View page source (Ctrl+U)
   - Look for `<title>`, `<meta name="description">`, and JSON-LD structured data

### Test Sitemap
Visit: `http://localhost:3000/sitemap.xml`

### Test Robots.txt
Visit: `http://localhost:3000/robots.txt`

## Production Deployment

### Before Deploying:
1. Set `NEXT_PUBLIC_SITE_URL` to your production domain
2. Update CORS origins in `backend/server.js` if needed
3. Ensure MongoDB is connected
4. Test blog creation and viewing

### After Deploying:
1. Submit sitemap to Google Search Console
2. Test blog pages load correctly
3. Verify meta tags in page source
4. Check structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)

## Common Issues

### Blog Not Showing
- Check if status is "published" (not "draft")
- Verify backend API is running
- Check browser console for errors

### SEO Tags Not Working
- Ensure `NEXT_PUBLIC_SITE_URL` is set correctly
- Check page source (not just browser inspector)
- Verify server-side rendering is working

### API Errors
- Check backend logs
- Verify MongoDB connection
- Ensure CORS is configured correctly

---

For detailed documentation, see [BLOG_SYSTEM.md](./BLOG_SYSTEM.md)

