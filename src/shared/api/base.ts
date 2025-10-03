import { PUBLIC_API } from "$env/static/public";

export async function api<T>(
    fetchFn: typeof fetch,
    url: string,
    options: RequestInit = {},
    token?: string,
): Promise<T> {
    const res = await fetchFn(PUBLIC_API + url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {}),
        }
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return res.json() as Promise<T>;
}