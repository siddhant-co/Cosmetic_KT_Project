import { Testimonial } from "@/types/testimonial";




export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await fetch("https://ecom-testing.up.railway.app/frontend/testimonial", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch testimonials");

  const data = await res.json();
  return data.testimonials.filter((t: Testimonial) => t.is_active);
}
