import { WhyChooseUsItem } from "@/types/whyChooseUs";

export async function getWhyChooseUs(): Promise<WhyChooseUsItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/why-choose-us`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const data = await res.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching Why Choose Us data:', error);
    return []; 
  }
}