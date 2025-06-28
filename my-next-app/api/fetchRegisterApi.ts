export async function registerUser(formData: FormData): Promise<string> {
  try {
    const response = await fetch("https://ecom-testing.up.railway.app/auth/register", {
      method: "POST",
      body: formData,
    });

    const result = await response.text(); 
    return result;
  } catch (error) {
    throw new Error((error as Error).message || "Registration failed");
  }
}