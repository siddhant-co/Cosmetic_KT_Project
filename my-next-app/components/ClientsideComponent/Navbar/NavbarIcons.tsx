// components/Navbar/NavbarIcons.tsx
"use client";

import React from "react";
import Link from "next/link";
import { FiHeart, FiShoppingBag } from "react-icons/fi"; // Using FiShoppingBag for consistency
import { useAppSelector } from "@/store/hooks/hooks";
import { selectIsLoggedIn } from "@/store/slices/authSlice";
import { selectCartItems as selectGuestCartItems } from "@/store/slices/cartSlice"; // Alias to avoid confusion
import { useLoggedInCart } from "@/Providers/LoggedInCartProvider"; // Corrected import path
import UserAvatar from "@/components/UserAvatar/UserAvatar"; // Assuming this path is correct
import { CartItem } from "@/types/cart"; // Import CartItem type

const NavbarIcons = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const guestCartItems = useAppSelector(selectGuestCartItems); // Guest cart items from Redux slice

  // Get the logged-in cart context. It will be empty/loading if not logged in.
  const loggedInCart = useLoggedInCart();

  // Determine which cart items to use based on login status
  const currentCartItems = isLoggedIn ? loggedInCart.items : guestCartItems;

  // Calculate total quantity of items in the cart
  const totalCartQuantity = currentCartItems.reduce(
    (total: number, item: CartItem) => total + item.quantity, // Explicitly typed 'total' and 'item'
    0
  );

  // Check if the logged-in cart is loading (only relevant for logged-in users)
  const isLoadingCart = isLoggedIn && loggedInCart.loading;

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
        <span>Bag</span>
        {/* Display loading indicator or total quantity */}
        {isLoadingCart ? (
          <span className="absolute -top-1 -right-2 bg-gray-400 text-white text-xs rounded-full px-1 animate-pulse">
            ...
          </span>
        ) : (
          totalCartQuantity > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {totalCartQuantity}
            </span>
          )
        )}
      </Link>
    </div>
  );
};

export default NavbarIcons;
