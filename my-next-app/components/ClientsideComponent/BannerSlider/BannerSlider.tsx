"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";

interface BannerItem {
  id: number;
  heading: string;
  subheading: string;
  subheading2?: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  isActive: boolean;
}

export default function BannerSlider({ banners }: { banners: BannerItem[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel);
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 4000);
        }

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      <div ref={sliderRef} className="keen-slider w-full h-full">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="keen-slider__slide relative flex items-center justify-center"
          >
            <img
              src={banner.imageUrl}
              alt={banner.heading}
              className="w-full h-full object-cover"
            />
            {/* <div className="absolute left-8 top-1/2 -translate-y-1/2 text-white max-w-md">
              <p className="text-sm uppercase">{banner.subheading}</p>
              <h2 className="text-4xl font-bold mt-2">{banner.heading}</h2>
              {banner.subheading2 && (
                <p className="mt-1 text-base">{banner.subheading2}</p>
              )}
              <a
                href={banner.buttonLink}
                className="mt-4 inline-block bg-white text-black px-5 py-2 rounded shadow hover:bg-gray-200 text-sm font-medium"
              >
                {banner.buttonText}
              </a>
            </div> */}
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === idx ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70"
      >
        &#8592;
      </button>
      <button
        onClick={() => instanceRef.current?.next()}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70"
      >
        &#8594;
      </button>
    </div>
  );
}
