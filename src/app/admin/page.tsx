
// Client Component for Admin Dashboard Protection
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboardNoSSR from './admin-dashboard-no-ssr';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) {
    return null; // or loading spinner
  }

  return (
    <main className="mx-auto max-w-6xl p-6 space-y-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Manage your website content and leads</p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('admin_token');
            router.push('/login');
          }}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </header>

      <AdminDashboardNoSSR />
    </main>
  );
}
