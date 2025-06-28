export const apiCore = async (url: string, method: string, body?: any, token?: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const fullUrl = `${baseUrl}${url}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(fullUrl, {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${fullUrl}`);
  }

  const contentType = response.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    throw new Error("Expected JSON response, but got something else.");
  }

  return await response.json();
};
