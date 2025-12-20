'use client';

import LeadsTable from '@/app/admin/LeadsTable';
import PricingManager from '@/app/admin/PricingManager';
import CMSManager from '@/app/admin/CMSManager';
import AboutSectionsManager from '@/app/admin/AboutSectionsManager';
import BlogManager from '@/app/admin/BlogManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboardClient() {
    return (
        <Tabs defaultValue="leads" className="w-full">
            <TabsList className="mb-8">
                <TabsTrigger value="leads">Contact Leads</TabsTrigger>
                <TabsTrigger value="pricing">Pricing Plans</TabsTrigger>
                <TabsTrigger value="cms">Website CMS</TabsTrigger>
                <TabsTrigger value="about_sections">About Page</TabsTrigger>
                <TabsTrigger value="blogs">Blog Management</TabsTrigger>
            </TabsList>
            <TabsContent value="leads">
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold">Contact Leads</h2>
                        <p className="text-sm text-gray-500">View and manage customer inquiries.</p>
                    </div>
                    <LeadsTable />
                </div>
            </TabsContent>
            <TabsContent value="pricing">
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold">Pricing Management</h2>
                        <p className="text-sm text-gray-500">Manage pricing packages displayed on the website.</p>
                    </div>
                    <PricingManager />
                </div>
            </TabsContent>
            <TabsContent value="cms">
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold">Website Content (CMS)</h2>
                        <p className="text-sm text-gray-500">Manage About, Footer, and Contact details.</p>
                    </div>
                    <CMSManager />
                </div>
            </TabsContent>
            <TabsContent value="about_sections">
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold">About Page Sections</h2>
                        <p className="text-sm text-gray-500">Manage Our Team and Trusted Stats sections.</p>
                    </div>
                    <AboutSectionsManager />
                </div>
            </TabsContent>
            <TabsContent value="blogs" className="w-full">
                <div className="bg-white p-6 rounded-lg border shadow-sm w-full">
                    <BlogManager />
                </div>
            </TabsContent>
        </Tabs>
    );
}
