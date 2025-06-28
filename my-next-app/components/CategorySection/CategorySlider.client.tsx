"use client";

import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import { Category } from "@/types/category";
import Link from "next/link";

interface Props {
  categories: Category[];
}

// Cleaned-up animation plugin
const animation: KeenSliderPlugin = (slider) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  const clearNextTimeout = () => clearTimeout(timeout);

  slider.on("created", () => {
    slider.container.addEventListener("mouseover", clearNextTimeout);
    slider.container.addEventListener("mouseout", clearNextTimeout);
  });

  slider.on("animationStarted", clearNextTimeout);
};

export default function CategorySlider({ categories }: Props) {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      slides: {
        perView: 3,
        spacing: 16,
      },
      breakpoints: {
        "(max-width: 1024px)": {
          slides: { perView: 2.2, spacing: 14 },
        },
        "(max-width: 768px)": {
          slides: { perView: 1.2, spacing: 12 },
        },
      },
      renderMode: "performance",
      defaultAnimation: {
        duration: 100,
        easing: (t) => t,
      },
    },
    [animation]
  );

  const handlePrev = () => {
    if (slider.current) {
      const idx = slider.current.track.details.rel;
      slider.current.moveToIdx(idx - 1);
    }
  };

  const handleNext = () => {
    if (slider.current) {
      const idx = slider.current.track.details.rel;
      slider.current.moveToIdx(idx + 1);
    }
  };

  return (
    <div className="relative px-1">
      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 shadow p-2 rounded-full hover:bg-gray-100"
      >
        <CircleChevronLeft size={30} />
      </button>
      <button
        onClick={handleNext}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 shadow p-2 rounded-full hover:bg-gray-100"
      >
        <CircleChevronRight size={30} />
      </button>

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

    </div>
  );
}
