// APICoreGet.ts
export const apiCore = async (url: string, method: string, body?: any) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${baseUrl}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(body && { body: JSON.stringify(body) }),
  });
  const data = await response.json();
  return data;
};
