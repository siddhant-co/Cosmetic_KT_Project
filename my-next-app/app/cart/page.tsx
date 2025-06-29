// app/cart/page.tsx
"use client";

import React from "react";
import { useLoggedInCart } from "@/Providers/LoggedInCartContext";
import { useAppSelector, useAppDispatch } from "@/store/hooks/hooks"; // Import useAppSelector and useAppDispatch
import {
  selectCartItems as selectGuestCartItems,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart as clearGuestCart,
} from "@/store/slices/cartSlice"; // Import guest cart actions
import { selectIsLoggedIn } from "@/store/slices/authSlice"; // Import selectIsLoggedIn
import { CartItem } from "@/types/cart";

const CartPage = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const guestCartItems = useAppSelector(selectGuestCartItems);
  const dispatch = useAppDispatch(); // FIX: Correctly get dispatch using useAppDispatch()

  const {
    items: loggedInCartItems, // Rename to avoid conflict
    loading: loggedInLoading,
    error: loggedInError,
    incrementItemQuantity: incrementLoggedInItem,
    decrementItemQuantity: decrementLoggedInItem,
    removeCartItem: removeLoggedInItem,
    clearCart: clearLoggedInCart,
  } = useLoggedInCart();

  // Determine which cart data and functions to use based on login status
  const items = isLoggedIn ? loggedInCartItems : guestCartItems;
  const loading = isLoggedIn ? loggedInLoading : false; // Guest cart is not "loading" from API
  const error = isLoggedIn ? loggedInError : null; // Guest cart has no API errors

  const handleIncrement = (cartItemId: number) => {
    if (isLoggedIn) {
      incrementLoggedInItem(cartItemId);
    } else {
      dispatch(incrementQuantity(cartItemId));
    }
  };

  const handleDecrement = (cartItemId: number) => {
    if (isLoggedIn) {
      decrementLoggedInItem(cartItemId);
    } else {
      dispatch(decrementQuantity(cartItemId));
    }
  };

  const handleRemove = (cartItemId: number) => {
    if (isLoggedIn) {
      removeLoggedInItem(cartItemId);
    } else {
      dispatch(removeFromCart(cartItemId));
    }
  };

  const handleClearCart = () => {
    if (isLoggedIn) {
      clearLoggedInCart();
    } else {
      dispatch(clearGuestCart());
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading your cart...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        Error loading cart: {error}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Your cart is empty. Start shopping!
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.cartItemId} // This key is CRUCIAL for both logged-in and guest!
            className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
          >
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md mr-4"
              />
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600">
                  Price: ₹{item.sellingPrice.toFixed(2)}
                </p>
                <p className="text-gray-600">Product ID: {item.id}</p>
                {/* <p className="text-gray-600">Cart Item ID: {item.cartItemId}</p> // For debugging */}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleDecrement(item.cartItemId)}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="font-medium text-lg">{item.quantity}</span>
              <button
                onClick={() => handleIncrement(item.cartItemId)}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                +
              </button>
              <button
                onClick={() => handleRemove(item.cartItemId)}
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <p className="text-xl font-bold">
          Total: ₹
          {items
            .reduce(
              (total: number, item: CartItem) =>
                total + item.sellingPrice * item.quantity,
              0
            )
            .toFixed(2)}
        </p>
        <button
          onClick={handleClearCart}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartPage;
