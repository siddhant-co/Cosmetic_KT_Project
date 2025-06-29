// utils/apiCore.ts
export const apiCore = async (
  url: string,
  method: string,
  body?: any,
  token?: string
) => {
  // Ensure a fallback base URL if environment variable is not set
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ecom-ahj1.onrender.com";
  const fullUrl = `${baseUrl}${url}`;

  const headers: Record<string, string> = {};

  // Only set Content-Type for methods that send a body
  if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    headers["Content-Type"] = "application/json";
  }

  // Use "Token" for authorization as per your backend's expectation
  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }

  try {
    const res = await fetch(fullUrl, {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) }),
      cache: "no-store", // Crucial for always re-fetching fresh data on server-side
    });

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
        errorData.message = res.statusText; // Fallback if response isn't parseable
      }

      console.error(
        `[ Server ] API error: ${res.status} "${errorData.message?.slice(0, 200) || res.statusText}"`
      );
      throw new Error(
        `API error ${res.status}: ${fullUrl} - ${errorData.message?.slice(0, 100) || res.statusText}`
      );
    }

    if (contentType?.includes("application/json")) {
      return await res.json();
    } else {
      // Handle cases where response is OK but not JSON (e.g., DELETE returns 204 No Content)
      console.warn(`[ Server ] Non-JSON response for ${fullUrl}: ${res.status}`);
      return null; // Or return a success indicator like { success: true }
    }
  } catch (error) {
    console.error(`[ Server ] Fetch failed for ${fullUrl}:`, error);
    throw error; // Re-throw to be caught by calling function
  }
};