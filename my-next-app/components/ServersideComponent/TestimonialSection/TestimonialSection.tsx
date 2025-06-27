import TestimonialSlider from "@/components/ClientsideComponent/TestimonialSlider/TestimonailSlider";
import SectionHeader from "@/components/common/SectionHeader";


export default async function TestimonialSection() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/frontend/testimonial`, {
    next: { revalidate: 3600 }, // cache for 1 hour
  });

  const data = await res.json();
  const testimonials = data.testimonials;

  return (
    <section className="py-[32px] px-[40px] bg-gray-50">
<SectionHeader 
  title="What our happy client say" 
  subtitle="Hear directly from our satisfied customers about their experiences and discover why they love our brand." 
/>
      <TestimonialSlider testimonials={testimonials} />
    </section>
  );
}
