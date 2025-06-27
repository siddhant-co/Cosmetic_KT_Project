"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
};

type Props = {
  testimonials: Testimonial[];
};

export default function TestimonialSlider({ testimonials }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className="relative px-4 lg:px-10 bg-[#b0c9e8] py-10">
      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="hidden md:flex absolute left-[-50px] top-1/2 -translate-y-1/2 z-10 bg-white text-[#1d3b60] hover:bg-[#163152] hover:text-white p-2 rounded-full shadow transition"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={handleNext}
        className="hidden md:flex absolute right-[-50px] top-1/2 -translate-y-1/2 z-10 bg-white text-[#1d3b60] hover:bg-[#163152] hover:text-white p-2 rounded-full shadow transition"
      >
        <ChevronRight size={18} />
      </button>

      {/* Swiper */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onSwiper={(swiperInstance) => (swiperRef.current = swiperInstance)}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        loop
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={t.id}>
            <div
              className={`transition-transform duration-300 ease-in-out bg-white rounded-xl shadow-md p-6 mx-auto min-h-[220px] max-w-md my-8 ${
                index === activeIndex ? "scale-110" : "scale-90"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-lg text-black">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{t.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
