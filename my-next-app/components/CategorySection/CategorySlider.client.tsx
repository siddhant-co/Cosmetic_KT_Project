"use client";
import Image from "next/image";
<<<<<<< HEAD
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface Category {
  id: number;
  name: string;
  imageUrl: string;
}
=======
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import { Category } from "@/types/category";
import Link from "next/link";
>>>>>>> 6b7aeb192928e1c05052f9344f7324fcf8ac3423

interface Props {
  categories: Category[];
}
const bgColors = ["#e6ffe6", "#cce0ff", "#ffb3b3", "#CCE6FF", "#FFCCCC"];

export default function CategorySlider({ categories }: Props) {
  return (
    <div className="px-4 pb-6">
      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Navigation, Autoplay]}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {categories.map((cat, index) => (
          <SwiperSlide key={cat.id}>
            <div className="flex-shrink-0 w-[260px] h-[420px] bg-white rounded-lg group cursor-pointer relative overflow-hidden transition-all duration-300 mx-auto">
              {/* 🔵 Background Bubble */}
              <div
                className={`
                  absolute
                  bottom-[80px]
                  left-1/2
                  -translate-x-1/2
                  z-0
                  w-[220px] 
                  h-[120px]
                  rounded-sm
                  transition-all duration-500 ease-in-out
                  group-hover:w-[260px] 
                  group-hover:h-[180px]
                  group-hover:rounded-[10px]
                `}
                style={{
                  backgroundColor: bgColors[index % bgColors.length],
                }}
              />

<<<<<<< HEAD
              {/* 🖼 Main Image (zoom + shadow only on image) */}
              <div className="relative z-10 flex justify-center h-[300px] sm:h-[280px] items-start pt-6">
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  width={280}
                  height={280}
                  className="object-contain transition-transform duration-500 group-hover:scale-115 group-hover:drop-shadow-lg"
                />
              </div>

              {/* 🔤 Category Name */}
              <h3 className="relative z-10 mt-20 text-center text-base font-semibold text-black">
                {cat.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
=======
<div ref={sliderRef} className="keen-slider px-1">
  {categories.map((category) => (
    <Link
      href={`/category/${category.id}`}
      key={category.id}
      className="keen-slider__slide rounded-md overflow-hidden shadow hover:shadow-md transition duration-300 cursor-pointer block"
    >
      <div className="relative w-full h-[400px]">
        {category.imageUrl ? (
          <Image
            src={category.imageUrl}
            alt={category.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>
      <div className="bg-gray-100 text-center py-2">
        <h3 className="text-lg font-semibold">{category.name}</h3>
      </div>
    </Link>
  ))}
</div>

>>>>>>> 6b7aeb192928e1c05052f9344f7324fcf8ac3423
    </div>
  );
}
