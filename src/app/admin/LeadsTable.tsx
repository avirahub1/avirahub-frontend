'use client';

import { useEffect, useState } from 'react';

type ContactItem = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
};


import { fetchContacts, deleteContact } from '@/services/api';

export default function LeadsTable() {
  const [data, setData] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const json = await fetchContacts();
        setData(json || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load leads');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white px-4 py-6 text-center text-sm text-gray-600">
        Loading leads...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-6 text-center text-sm text-red-700">
        {error}
      </div>
    );
  }

  const normalizedSearch = search.trim().toLowerCase();
  const filtered = normalizedSearch
    ? data.filter((item) => {
      const haystack = [
        item.name,
        item.email,
        item.phone || '',
        item.message,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalizedSearch);
    })
    : data;

  const handleExport = () => {
    if (!data.length) {
      alert('No leads to export.');
      return;
    }

    setExporting(true);
    try {
      const header = ['Name', 'Email', 'Phone', 'Message', 'Created Date'];

      const rows = data.map((item) => [
        item.name,
        item.email,
        item.phone || '',
        item.message,
        new Date(item.createdAt).toLocaleString(),
      ]);

      const escapeCell = (cell: string) => {
        const value = cell.replace(/\r?\n/g, ' ');
        if (/[",]/.test(value)) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      };

      const csvLines = [
        header.join(','),
        ...rows.map((row) => row.map((cell) => escapeCell(String(cell ?? ''))).join(',')),
      ];

      const csvContent = csvLines.join('\r\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'avira-hub-leads.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };


  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure?');
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      await deleteContact(id);

      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Failed to delete lead', err);
      alert('Failed to delete lead.');
    } finally {
      setDeletingId(null);
    }
  };


  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-gray-600">
          Total leads: <span className="font-medium">{data.length}</span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search leads..."
            className="w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="button"
            onClick={handleExport}
            disabled={exporting || !data.length}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-800 hover:bg-gray-50 disabled:opacity-60"
          >
            {exporting ? 'Exporting...' : 'Export Leads'}
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Message
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Date
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filtered.length ? (
                filtered.map((item) => (
                  <tr key={item._id}>
                    <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {item.phone || '—'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <div className="line-clamp-2 max-w-xs">{item.message}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-gray-700">
                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        disabled={deletingId === item._id}
                        className="inline-flex items-center rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
                      >
                        {deletingId === item._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="px-4 py-6 text-center text-sm text-gray-500"
                    colSpan={5}
                  >
                    {data.length
                      ? 'No matching leads.'
                      : 'No leads yet.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

