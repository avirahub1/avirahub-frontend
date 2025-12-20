'use client';

import { useState, useEffect } from 'react';
import { fetchBlogsAdmin, fetchBlogById, saveBlog, deleteBlog } from '@/services/api';
import { useForm } from 'react-hook-form';
import { Pencil, Trash2, Plus, Eye, EyeOff, Calendar, Tag, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Blog = {
    _id?: string;
    title: string;
    slug: string;
    featuredImage?: string;
    content: string;
    category?: string;
    tags?: string[];
    status: 'draft' | 'published';
    publishedAt?: string;
    metaTitle?: string;
    metaDescription?: string;
    seoKeywords?: string[];
    canonicalUrl?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    readingTime?: number;
    createdAt?: string;
    updatedAt?: string;
};

export default function BlogManager() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [previewContent, setPreviewContent] = useState('');
    const { toast } = useToast();

    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<Blog & {
        tagsString: string;
        keywordsString: string;
    }>();

    const status = watch('status');
    const content = watch('content');

    // Auto-generate slug from title
    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const fetchBlogs = async () => {
        try {
            const data = await fetchBlogsAdmin();
            setBlogs(data);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to load blogs",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Update preview when content changes
    useEffect(() => {
        if (content) {
            setPreviewContent(content);
        }
    }, [content]);

    const handleEdit = async (id: string) => {
        try {
            const blog = await fetchBlogById(id);
            setEditingBlog(blog);
            reset({
                ...blog,
                tagsString: blog.tags?.join(', ') || '',
                keywordsString: blog.seoKeywords?.join(', ') || '',
            });
            setIsDialogOpen(true);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to load blog",
            });
        }
    };

    const handleNew = () => {
        setEditingBlog(null);
        reset({
            title: '',
            slug: '',
            featuredImage: '',
            content: '',
            category: '',
            tags: [],
            status: 'draft',
            metaTitle: '',
            metaDescription: '',
            seoKeywords: [],
            canonicalUrl: '',
            ogTitle: '',
            ogDescription: '',
            ogImage: '',
            readingTime: 0,
            tagsString: '',
            keywordsString: '',
        });
        setIsDialogOpen(true);
    };

    const onSubmit = async (data: any) => {
        try {
            // Auto-generate slug if empty
            if (!data.slug && data.title) {
                data.slug = generateSlug(data.title);
            }

            // Process tags and keywords
            const payload: Blog = {
                ...data,
                tags: data.tagsString ? data.tagsString.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
                seoKeywords: data.keywordsString ? data.keywordsString.split(',').map((k: string) => k.trim()).filter(Boolean) : [],
            };

            // Remove helper fields
            delete (payload as any).tagsString;
            delete (payload as any).keywordsString;

            if (editingBlog?._id) {
                payload._id = editingBlog._id;
            }

            await saveBlog(payload);

            toast({
                title: "Success",
                description: `Blog ${editingBlog ? 'updated' : 'created'} successfully`,
            });
            setIsDialogOpen(false);
            reset();
            setEditingBlog(null);
            fetchBlogs();
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message || "Operation failed",
            });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this blog?')) return;
        try {
            await deleteBlog(id);
            toast({ title: "Success", description: "Blog deleted" });
            fetchBlogs();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete blog",
            });
        }
    };

    // Auto-update slug when title changes
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setValue('title', title);
        if (!editingBlog || !watch('slug')) {
            setValue('slug', generateSlug(title));
        }
    };

    if (loading) {
        return <div className="text-center py-10">Loading blogs...</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold">Blog Posts</h3>
                    <p className="text-sm text-gray-500">Manage your blog content and SEO</p>
                </div>
                <Button onClick={handleNew}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Blog
                </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {blogs.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                    No blogs yet. Create your first blog post!
                                </td>
                            </tr>
                        ) : (
                            blogs.map((blog) => (
                                <tr key={blog._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <div className="font-medium">{blog.title}</div>
                                        <div className="text-sm text-gray-500">/{blog.slug}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {blog.category && (
                                            <Badge variant="outline">{blog.category}</Badge>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge variant={blog.status === 'published' ? 'default' : 'secondary'}>
                                            {blog.status === 'published' ? (
                                                <><Eye className="h-3 w-3 mr-1" /> Published</>
                                            ) : (
                                                <><EyeOff className="h-3 w-3 mr-1" /> Draft</>
                                            )}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500">
                                        {blog.publishedAt
                                            ? new Date(blog.publishedAt).toLocaleDateString()
                                            : blog.createdAt
                                            ? new Date(blog.createdAt).toLocaleDateString()
                                            : '-'}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleEdit(blog._id!)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(blog._id!)}
                                            >
                                                <Trash2 className="h-4 w-4 text-red-600" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingBlog ? 'Edit Blog' : 'Create New Blog'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <Tabs defaultValue="content" className="w-full">
                            <TabsList>
                                <TabsTrigger value="content">Content</TabsTrigger>
                                <TabsTrigger value="seo">SEO Settings</TabsTrigger>
                                <TabsTrigger value="preview">Preview</TabsTrigger>
                            </TabsList>

                            <TabsContent value="content" className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                        id="title"
                                        {...register('title', { required: true })}
                                        onChange={handleTitleChange}
                                        placeholder="Enter blog title"
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-red-500 mt-1">Title is required</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="slug">Slug (URL) *</Label>
                                    <Input
                                        id="slug"
                                        {...register('slug', { required: true })}
                                        placeholder="blog-url-slug"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        URL-friendly version (e.g., "how-to-rank-website")
                                    </p>
                                    {errors.slug && (
                                        <p className="text-sm text-red-500 mt-1">Slug is required</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="featuredImage">Featured Image URL</Label>
                                    <Input
                                        id="featuredImage"
                                        {...register('featuredImage')}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        {...register('category')}
                                        placeholder="e.g., Web Design, SEO, Marketing"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="tagsString">Tags (comma-separated)</Label>
                                    <Input
                                        id="tagsString"
                                        {...register('tagsString')}
                                        placeholder="web design, seo, marketing"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="content">Content (HTML) *</Label>
                                    <Textarea
                                        id="content"
                                        {...register('content', { required: true })}
                                        placeholder="Enter your blog content in HTML format..."
                                        rows={15}
                                        className="font-mono text-sm"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        You can write HTML directly or use a WYSIWYG editor and paste the HTML here
                                    </p>
                                    {errors.content && (
                                        <p className="text-sm text-red-500 mt-1">Content is required</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="readingTime">Reading Time (minutes)</Label>
                                    <Input
                                        id="readingTime"
                                        type="number"
                                        {...register('readingTime', { valueAsNumber: true })}
                                        placeholder="5"
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="status"
                                        checked={status === 'published'}
                                        onCheckedChange={(checked) =>
                                            setValue('status', checked ? 'published' : 'draft')
                                        }
                                    />
                                    <Label htmlFor="status" className="cursor-pointer">
                                        Publish (Draft when unchecked)
                                    </Label>
                                </div>
                            </TabsContent>

                            <TabsContent value="seo" className="space-y-4">
                                <div>
                                    <Label htmlFor="metaTitle">Meta Title</Label>
                                    <Input
                                        id="metaTitle"
                                        {...register('metaTitle')}
                                        placeholder="SEO-optimized title (50-60 characters)"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Leave empty to use blog title
                                    </p>
                                </div>

                                <div>
                                    <Label htmlFor="metaDescription">Meta Description</Label>
                                    <Textarea
                                        id="metaDescription"
                                        {...register('metaDescription')}
                                        placeholder="SEO description (150-160 characters)"
                                        rows={3}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="keywordsString">SEO Keywords (comma-separated)</Label>
                                    <Input
                                        id="keywordsString"
                                        {...register('keywordsString')}
                                        placeholder="web design, seo services, digital marketing"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="canonicalUrl">Canonical URL</Label>
                                    <Input
                                        id="canonicalUrl"
                                        {...register('canonicalUrl')}
                                        placeholder="https://avirahub.in/blog/your-blog-slug"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Leave empty to auto-generate from slug
                                    </p>
                                </div>

                                <div className="border-t pt-4">
                                    <h4 className="font-semibold mb-3">Open Graph Tags (for social sharing)</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <Label htmlFor="ogTitle">OG Title</Label>
                                            <Input
                                                id="ogTitle"
                                                {...register('ogTitle')}
                                                placeholder="Leave empty to use meta title"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="ogDescription">OG Description</Label>
                                            <Textarea
                                                id="ogDescription"
                                                {...register('ogDescription')}
                                                placeholder="Leave empty to use meta description"
                                                rows={2}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="ogImage">OG Image URL</Label>
                                            <Input
                                                id="ogImage"
                                                {...register('ogImage')}
                                                placeholder="Leave empty to use featured image"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="preview">
                                <div className="border rounded-lg p-6 bg-white">
                                    <h3 className="text-xl font-bold mb-4">{watch('title') || 'Preview'}</h3>
                                    {watch('featuredImage') && (
                                        <img
                                            src={watch('featuredImage')}
                                            alt="Featured"
                                            className="w-full h-auto rounded-lg mb-4"
                                        />
                                    )}
                                    <div
                                        className="prose max-w-none"
                                        dangerouslySetInnerHTML={{ __html: previewContent || '<p>No content yet...</p>' }}
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>

                        <div className="flex justify-end gap-2 pt-4 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">
                                {editingBlog ? 'Update Blog' : 'Create Blog'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

