
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://avirahub-backend.onrender.com/api';

/**
 * Helper to handle Render cold starts (502/503/504) with retries.
 */
async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3, delay = 1000): Promise<Response> {
    try {
        const res = await fetch(url, options);
        // Retry on server errors that might be temporary (cold start)
        if (res.status >= 502 && res.status <= 504 && retries > 0) {
            console.log(`Retrying ${url} (${retries} attempts left)...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
            return fetchWithRetry(url, options, retries - 1, delay * 2);
        }
        return res;
    } catch (error) {
        if (retries > 0) {
            console.log(`Retrying network error for ${url} (${retries} attempts left)...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
            return fetchWithRetry(url, options, retries - 1, delay * 2);
        }
        throw error;
    }
}

export async function fetchCMS(section?: string) {
    const url = section ? `${API_URL}/cms?section=${section}` : `${API_URL}/cms`;
    const res = await fetchWithRetry(url);
    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
}

export async function login(credentials: any) {
    const res = await fetchWithRetry(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
}


export async function updateCMS(payload: any) {
    const res = await fetchWithRetry(`${API_URL}/cms`, {
        method: 'POST', // Backend uses POST for update/upsert
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update data');
    return res.json();
}

export async function fetchTeam(activeOnly = true) {
    const endpoint = activeOnly ? `${API_URL}/team` : `${API_URL}/team/admin`;
    const res = await fetchWithRetry(endpoint);
    if (!res.ok) throw new Error('Failed to fetch team');
    return res.json();
}

// Team CRUD
export async function saveTeamMember(data: any) {
    const isUpdate = !!data._id;
    const method = isUpdate ? 'PUT' : 'POST';
    const url = isUpdate ? `${API_URL}/team/${data._id}` : `${API_URL}/team`;
    const res = await fetchWithRetry(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to save team member');
    return res.json();
}

export async function deleteTeamMember(id: string) {
    const res = await fetchWithRetry(`${API_URL}/team/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete team member');
    return res.json();
}

// Pricing CRUD
export async function fetchPricing() {
    const res = await fetchWithRetry(`${API_URL}/pricing`);
    if (!res.ok) throw new Error('Failed to fetch pricing');
    return res.json();
}

export async function savePricing(data: any) {
    const isUpdate = !!data._id;
    const method = isUpdate ? 'PUT' : 'POST';
    const url = `${API_URL}/pricing`;
    const res = await fetchWithRetry(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to save pricing');
    return res.json();
}

export async function deletePricing(id: string) {
    const res = await fetchWithRetry(`${API_URL}/pricing?id=${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete pricing');
    return res.json();
}


export async function createContact(data: any) {
    const res = await fetchWithRetry(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to send message');
    }

    const result = await res.json();

    // 🔥 Normalize response for frontend
    return {
        success: true,
        data: result,
    };
}

export async function fetchContacts() {
    const res = await fetchWithRetry(`${API_URL}/contact`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch contacts');
    return res.json();
}

export async function deleteContact(id: string) {
    const res = await fetchWithRetry(`${API_URL}/contact?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete contact');
    return res.json();
}
