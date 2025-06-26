"use client";
import React from "react";

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

interface BannerProps {
  banners: BannerItem[];
}

const fallbackBanner: BannerItem = {
  id: 0,
  heading: "Glow Up Your Skin",
  subheading: "Discover the skincare secrets",
  subheading2: "Shop our latest collection now!",
  buttonText: "Shop Now",
  buttonLink: "/shop",
  imageUrl:
    "https://readymadeui-nextjs-ecommerce-site-3.vercel.app/assets/images/skin-glow-banner.webp",
  isActive: true,
};

const Banner: React.FC<BannerProps> = ({ banners }) => {
  const banner = banners.find((b) => b.isActive) || banners[0] || fallbackBanner;

  return (
    <section className="w-full h-[60vh] overflow-hidden">
      <img
        src={banner.imageUrl}
        alt={banner.heading}
        className="w-full h-full object-cover"
      />
    </section>
  );
};

export default Banner;
