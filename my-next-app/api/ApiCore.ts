// api/ApiCore.ts
export const apiCore = async (url: string, method: string, body?: any, token?: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const fullUrl = `${baseUrl}${url}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;  // ensure Bearer prefix
  }

  const res = await fetch(fullUrl, {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("API error:", res.status, text);
    throw new Error(`API error ${res.status}: ${fullUrl}`);
  }
  return await res.json();
};
