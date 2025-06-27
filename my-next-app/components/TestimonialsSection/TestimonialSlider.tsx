'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { useState } from 'react';

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

  return (
    <div className="px-4 lg:px-10">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
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
              className={`transition-transform duration-300 ease-in-out bg-white rounded-xl shadow-md p-5 mx-auto h-[250px] max-w-md ${
                index === activeIndex ? 'scale-110 rounded-xl' : 'scale-90'
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
