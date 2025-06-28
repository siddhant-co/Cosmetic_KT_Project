"use client";

import UserAvatar from "@/components/UserAvatar/UserAvatar";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

const NavbarIcons = () => {
  const cartCount = useAppSelector((state) => state.cart.items.length);

  return (
    <div className="flex items-center gap-6 text-black">
      <div className="flex flex-col items-center text-xs font-semibold">
        <UserAvatar />
      </div>

      <div className="flex flex-col items-center text-xs font-semibold">
        <FiHeart size={20} />
        <span>Wishlist</span>
      </div>

      <Link
        href="/cart"
        className="relative flex flex-col items-center text-xs font-semibold hover:text-purple-600 transition"
      >
        <FiShoppingBag size={20} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            {cartCount}
          </span>
        )}
        <span>Bag</span>
      </Link>
    </div>
  );
};

export default NavbarIcons;
