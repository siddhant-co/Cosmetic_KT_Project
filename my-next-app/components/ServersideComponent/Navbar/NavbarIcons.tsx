"use client";

import UserAvatar from "@/components/UserAvatar/UserAvatar";
import { FiUser, FiHeart, FiShoppingBag } from "react-icons/fi";

const NavbarIcons = () => {
  return (
    <div className="flex items-center gap-6 text-black">
      <div className="flex flex-col items-center text-xs font-semibold">
        <UserAvatar />
      </div>
      <div className="flex flex-col items-center text-xs font-semibold">
        <FiHeart size={20} />
        <span>Wishlist</span>
      </div>
      <div className="flex flex-col items-center text-xs font-semibold">
        <FiShoppingBag size={20} />
        <span>Bag</span>
      </div>
    </div>
  );
};

export default NavbarIcons;
