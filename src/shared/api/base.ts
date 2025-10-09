import { PUBLIC_API } from "$env/static/public";

export async function api<T>(
  fetchFn: typeof fetch,
  url: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  options.headers = options.headers || {};
  // @ts-ignore
  const contentType = options.headers["Content-Type"] || "";
  if (!contentType) {
    // @ts-ignore
    options.headers["Content-Type"] = "application/json";
  }
  if (contentType == "multipart/form-data") {
    // @ts-ignore
    delete options.headers["Content-Type"];
  }
  const req = {
    ...options,
    headers: {
      // ...(options.headers? {"Content-Type": "application/json"} : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  };
  const res = await fetchFn(PUBLIC_API + url, req);

  if (!res.ok) {
    throw new Error(await res.text());
  }
  if (res.status === 204) {
    return undefined as unknown as T;
  }
  return res.json() as Promise<T>;
}
