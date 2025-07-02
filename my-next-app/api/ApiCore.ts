export const apiCore = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  body?: unknown,
  token?: string | null,
  fetchOptions?: RequestInit & { next?: { revalidate?: number } } // ✅ ALLOW `next` or custom cache
): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cosmaticadmin.twilightparadox.com";
  const fullUrl = `${baseUrl}${url}`;

  const headers: Record<string, string> = {};

  if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    headers["Content-Type"] = "application/json";
  }

  if (token && typeof token === 'string' && token.trim() !== '') {
    headers["Authorization"] = `Token ${token}`;
  }

  const requestOptions: RequestInit & { next?: { revalidate?: number } } = {
    method,
    headers,
    ...fetchOptions, // ✅ allow custom `next` or cache override
  };

  if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(fullUrl, requestOptions);

    const contentType = res.headers.get("Content-Type");

    if (!res.ok) {
      let errorData: any = {};
      try {
        if (contentType?.includes("application/json")) {
          errorData = await res.json();
        } else {
          errorData.message = await res.text();
        }
      } catch (e) {
        errorData.message = res.statusText;
      }

      console.error(
        `[ Server ] API error: ${res.status} "${errorData.message?.slice(0, 200) || res.statusText}"`
      );
      throw new Error(
        `API error ${res.status}: ${fullUrl} - ${errorData.message?.slice(0, 100) || res.statusText}`
      );
    }

    if (contentType?.includes("application/json")) {
      return await res.json() as T;
    } else {
      console.warn(`[ Server ] Non-JSON response for ${fullUrl}: ${res.status}. Returning null.`);
      return null as T;
    }
  } catch (error) {
    console.error(`[ Server ] Fetch failed for ${fullUrl}:`, error);
    throw error;
  }
};
