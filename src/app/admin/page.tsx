
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AdminDashboardNoSSR from './admin-dashboard-no-ssr';

// Force dynamic rendering because getServerSession relies on request headers.
export const dynamic = 'force-dynamic';


export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  if ((session.user as any)?.role !== 'admin') {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
        <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-4 text-center text-red-700">
          Access Denied
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl p-6 space-y-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Manage your website content and leads</p>
        </div>
      </header>

      <AdminDashboardNoSSR />
    </main>
  );
}

