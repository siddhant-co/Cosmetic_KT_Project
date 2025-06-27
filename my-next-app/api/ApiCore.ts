// api/ApiCore.ts
export const apiCore = async (url: string, method: string, body?: any) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const fullUrl = `${baseUrl}${url}`;

  const response = await fetch(fullUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(body && { body: JSON.stringify(body) }),
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${fullUrl}`);
  }

  if (!contentType?.includes("application/json")) {
    const text = await response.text();
    console.error("Not JSON:", text);
    throw new Error("Expected JSON response, but got HTML.");
  }

  return await response.json();
};
