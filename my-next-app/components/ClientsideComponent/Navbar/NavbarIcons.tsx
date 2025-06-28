"use client";

import UserAvatar from "@/components/UserAvatar/UserAvatar";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import Link from "next/link";

const NavbarIcons = () => {
  return (
    <div className="flex items-center gap-6 text-black">
      {/* User Avatar */}
      <div className="flex flex-col items-center text-xs font-semibold">
        <UserAvatar />
      </div>

      {/* Wishlist */}
      <div className="flex flex-col items-center text-xs font-semibold">
        <FiHeart size={20} />
        <span>Wishlist</span>
      </div>

      {/* Shopping Bag -> Links to /cart */}
      <Link
        href="/cart"
        className="flex flex-col items-center text-xs font-semibold hover:text-purple-600 transition"
      >
        <FiShoppingBag size={20} />
        <span>Bag</span>
      </Link>
    </div>
  );
};

export default NavbarIcons;
