
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://avirahub-backend.onrender.com/api';

export async function fetchCMS(section?: string) {
    const url = section ? `${API_URL}/cms?section=${section}` : `${API_URL}/cms`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
}

export async function login(credentials: any) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
}


export async function updateCMS(payload: any) {
    const res = await fetch(`${API_URL}/cms`, {
        method: 'POST', // Backend uses POST for update/upsert
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update data');
    return res.json();
}

export async function fetchTeam(activeOnly = true) {
    const endpoint = activeOnly ? `${API_URL}/team` : `${API_URL}/team/admin`;
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error('Failed to fetch team');
    return res.json();
}

// Team CRUD
export async function saveTeamMember(data: any) {
    const isUpdate = !!data._id;
    const method = isUpdate ? 'PUT' : 'POST';
    const url = isUpdate ? `${API_URL}/team/${data._id}` : `${API_URL}/team`;
    const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to save team member');
    return res.json();
}

export async function deleteTeamMember(id: string) {
    const res = await fetch(`${API_URL}/team/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete team member');
    return res.json();
}

// Pricing CRUD
export async function fetchPricing() {
    const res = await fetch(`${API_URL}/pricing`);
    if (!res.ok) throw new Error('Failed to fetch pricing');
    return res.json();
}

export async function savePricing(data: any) {
    const isUpdate = !!data._id;
    const method = isUpdate ? 'PUT' : 'POST';
    // Backend pricing route uses query param for delete but maybe ID in body for PUT?
    // Wait, my backend implementation for pricing wasn't showing in viewing files.
    // I need to implement pricing route in backend too! I forgot to check if I created `backend/routes/pricing.js`.
    // I created cms, team, contact models and routes.
    // I checked `routes/cms.js`, `routes/team.js`, `routes/contact.js`.
    // I did NOT creating `routes/pricing.js`.
    // I created `models/Pricing.js`.
    // So I need to create `backend/routes/pricing.js` AND register it in `server.js`.
    // Assuming standardize endpoint `/api/pricing` accepts POST/PUT.
    const url = `${API_URL}/pricing`;
    const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to save pricing');
    return res.json();
}

export async function deletePricing(id: string) {
    const res = await fetch(`${API_URL}/pricing?id=${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete pricing');
    return res.json();
}


export async function createContact(data: any) {
    const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to send message');
    return res.json();
}

export async function fetchContacts() {
    const res = await fetch(`${API_URL}/contact`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch contacts');
    return res.json();
}

export async function deleteContact(id: string) {
    const res = await fetch(`${API_URL}/contact?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete contact');
    return res.json();
}
