
// import { getTestimonials } from "@/api/testimonialsApi";
// import Image from "next/image";

// export default async function TestimonialsSection() {
//   const testimonials = await getTestimonials();

//   return (
//     <section className="py-[32px] px-[40px] bg-gray-50">
//       <div className="w-full px-4">
//         <h2 className="text-3xl font-bold  mb-2">What our happy clients say</h2>
//         <p className=" text-gray-600 mb-2">
//           Hear from our satisfied customers and why they love our brand.
//         </p>
//         <hr className="mb-6 mt-3" />
//         <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 px-1">
//   {testimonials.map((t) => (
//     <div key={t.id} className="break-inside-avoid bg-white p-5 rounded-lg shadow-sm">
//       <div className="flex items-center gap-3 mb-3">
//         <Image
//           src={t.image}
//           alt={t.name}
//           width={48}
//           height={48}
//           className="rounded-full object-cover"
//         />
//         <div>
//           <h4 className="font-semibold">{t.name}</h4>
//           <p className="text-sm text-gray-500">{t.role}</p>
//         </div>
//       </div>
//       <p className="text-gray-700 text-sm">{t.description}</p>
//     </div>
//   ))}
// </div>

//       </div>
//     </section>
//   );
// }



// app/components/TestimonialSection.tsx
import TestimonialSlider from './TestimonialSlider';

export default async function TestimonialSection() {
  const res = await fetch('https://ecom-testing.up.railway.app/frontend/testimonial', {
    next: { revalidate: 3600 }, // cache for 1 hour
  });

  const data = await res.json();
  const testimonials = data.testimonials;

  return (
    <section className="py-[32px] px-[40px] bg-gray-50">
      <div className="text-center text-white mb-10">
      <h2 className="text-3xl font-bold  mb-2">What our happy clients say</h2>
        <p className=" text-gray-600 mb-2">
          Hear from our satisfied customers and why they love our brand.
        </p>
        <hr className="mb-6 mt-3" />
      </div>
      <TestimonialSlider testimonials={testimonials} />
    </section>
  );
}
