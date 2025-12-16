'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const AdminDashboardClient = dynamic(() => import('./admin-dashboard-client'), {
    ssr: false,
    loading: () => <div className="text-center py-10">Loading dashboard...</div>,
});

export default function AdminDashboardNoSSR() {
    return <AdminDashboardClient />;
}
