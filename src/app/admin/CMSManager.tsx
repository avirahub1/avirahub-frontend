
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';


import { fetchCMS, updateCMS } from '@/services/api';

export default function CMSManager() {

    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const aboutForm = useForm();
    const footerForm = useForm();
    const contactForm = useForm();



    const fetchContent = async () => {
        try {
            const data = await fetchCMS(); // Fetch all

            // Backend returns array if no section specified? 
            // My route implementation: if (!section) res.json(allData);
            // Yes.

            const about = Array.isArray(data) ? data.find((d: any) => d.section === 'about') || {} : {};
            const footer = Array.isArray(data) ? data.find((d: any) => d.section === 'footer') || {} : {};
            const contact = Array.isArray(data) ? data.find((d: any) => d.section === 'contact') || {} : {};

            aboutForm.reset(about);
            footerForm.reset({
                ...footer,
                instagram: footer.socialLinks?.instagram,
                linkedin: footer.socialLinks?.linkedin,
                twitter: footer.socialLinks?.twitter,
                youtube: footer.socialLinks?.youtube,
            });
            contactForm.reset(contact);
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to load content" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    const saveSection = async (section: string, data: any) => {
        try {
            // Format data for specific sections if needed
            let payload = { ...data, section };

            if (section === 'footer') {
                payload = {
                    section,
                    footerText: data.footerText,
                    copyrightText: data.copyrightText,
                    socialLinks: {
                        instagram: data.instagram,
                        linkedin: data.linkedin,
                        twitter: data.twitter,
                        youtube: data.youtube,
                    }
                }
            }

            await updateCMS(payload);
            toast({ title: "Success", description: `${section.charAt(0).toUpperCase() + section.slice(1)} updated` });
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to save content" });
        }
    };


    if (loading) return <div className="flex items-center justify-center p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <Tabs defaultValue="about" className="w-full">
                <TabsList>
                    <TabsTrigger value="about">About Page</TabsTrigger>
                    <TabsTrigger value="footer">Footer</TabsTrigger>
                    <TabsTrigger value="contact">Contact Details</TabsTrigger>
                </TabsList>

                {/* About Section */}
                <TabsContent value="about" className="space-y-4 mt-4 border p-4 rounded-md">
                    <h3 className="text-lg font-medium">About Page Content</h3>
                    <form onSubmit={aboutForm.handleSubmit((data) => saveSection('about', data))} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Title</label>
                            <Input {...aboutForm.register('title')} placeholder="Page Title" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Description</label>
                            <Textarea {...aboutForm.register('description')} rows={6} placeholder="Full description text..." />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Image URL (Optional)</label>
                            <Input {...aboutForm.register('image')} placeholder="/images/about.jpg" />
                        </div>
                        <Button type="submit">Save About</Button>
                    </form>
                </TabsContent>

                {/* Footer Section */}
                <TabsContent value="footer" className="space-y-4 mt-4 border p-4 rounded-md">
                    <h3 className="text-lg font-medium">Footer Content</h3>
                    <form onSubmit={footerForm.handleSubmit((data) => saveSection('footer', data))} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Footer Text (Tagline)</label>
                            <Input {...footerForm.register('footerText')} placeholder="Short text below logo" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Copyright Text</label>
                            <Input {...footerForm.register('copyrightText')} placeholder="© 2024 Avira Hub..." />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">Instagram URL</label>
                                <Input {...footerForm.register('instagram')} placeholder="https://instagram.com/..." />
                            </div>
                            <div>
                                <label className="text-sm font-medium">LinkedIn URL</label>
                                <Input {...footerForm.register('linkedin')} placeholder="https://linkedin.com/..." />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Twitter URL</label>
                                <Input {...footerForm.register('twitter')} placeholder="https://twitter.com/..." />
                            </div>
                            <div>
                                <label className="text-sm font-medium">YouTube URL</label>
                                <Input {...footerForm.register('youtube')} placeholder="https://youtube.com/..." />
                            </div>
                        </div>
                        <Button type="submit">Save Footer</Button>
                    </form>
                </TabsContent>

                {/* Contact Section */}
                <TabsContent value="contact" className="space-y-4 mt-4 border p-4 rounded-md">
                    <h3 className="text-lg font-medium">Contact Details</h3>
                    <form onSubmit={contactForm.handleSubmit((data) => saveSection('contact', data))} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">Email</label>
                                <Input {...contactForm.register('email')} placeholder="hello@example.com" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Phone</label>
                                <Input {...contactForm.register('phone')} placeholder="+91 9876543210" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">WhatsApp</label>
                                <Input {...contactForm.register('whatsapp')} placeholder="Wa.me link or number" />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Address</label>
                            <Textarea {...contactForm.register('address')} rows={3} placeholder="Full physical address" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Google Maps Embed URL</label>
                            <Input {...contactForm.register('googleMapEmbed')} placeholder="https://www.google.com/maps/embed?..." />
                            <p className="text-xs text-muted-foreground">Paste the 'src' attribute from the Google Maps Embed code.</p>
                        </div>
                        <Button type="submit">Save Contact Details</Button>
                    </form>
                </TabsContent>
            </Tabs>
        </div>
    );
}
