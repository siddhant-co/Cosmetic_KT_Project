// Providers/LoggedInCartProvider.tsx
"use client";

import React, { useState, useEffect, useCallback, useContext } from "react";
import { useAppSelector } from "@/store/hooks/hooks";
import { selectToken } from "@/store/slices/authSlice";
import { apiCore } from "@/api/ApiCore"; // Corrected import path and name
import LoggedInCartContext from "./LoggedInCartContext"; // This import is correct for the Context object

import { CartItem } from "@/types/cart"; // Import CartItem from central location

// Moved parseCartResponse outside the component to avoid re-creation
const parseCartResponse = (response: any): CartItem[] => {
  console.log(
    "LoggedInCartProvider: Raw response to parse (GET /cart):",
    response
  );
  let items: CartItem[] = [];

  try {
    let rawCartItems: any[] = [];

    // **CRITICAL: Adapt this to your backend's EXACT response structure.**
    if (
      response &&
      typeof response === "object" &&
      response.data &&
      typeof response.data === "object" &&
      Array.isArray(response.data.cart_items)
    ) {
      rawCartItems = response.data.cart_items;
      console.log(
        "LoggedInCartProvider: Parsed as object with 'data.cart_items' array."
      );
    }
    // Add other fallback structures if your backend can return different formats
    else if (
      response &&
      typeof response === "object" &&
      response.cart &&
      Array.isArray(response.cart.items)
    ) {
      rawCartItems = response.cart.items;
      console.log(
        "LoggedInCartProvider: Parsed as object with 'cart.items' array."
      );
    } else if (Array.isArray(response)) {
      rawCartItems = response;
      console.log("LoggedInCartProvider: Parsed as direct array.");
    } else if (
      response &&
      typeof response === "object" &&
      Array.isArray(response.items)
    ) {
      rawCartItems = response.items;
      console.log("LoggedInCartProvider: Parsed as object with 'items' array.");
    }
    // If none match, log a warning and return empty
    else {
      console.warn(
        "LoggedInCartProvider: Unexpected GET /cart response structure. Please adjust parseCartResponse.",
        response
      );
      return [];
    }

    // Fix for: Parameter 'item' implicitly has an 'any' type.ts(7006)
    items = rawCartItems.map((item: any) => {
      // <--- Added ': any' here to resolve the error
      // **CRITICAL: Ensure these mappings are correct for your backend's data!**
      const cartItemId = item.id; // This is the ID of the specific cart entry from backend
      const productId =
        item.product_id || item.product?.id || item.product?.productId; // This is the product's original ID

      const quantity = item.quantity;
      const productInfo = item.product || item; // Get product details, usually nested

      const name = productInfo.name || `Product ${productId}`;
      const sellingPrice = parseFloat(
        productInfo.sellingPrice || productInfo.selling_price || 0
      );
      const basePrice = parseFloat(
        productInfo.basePrice || productInfo.base_price || 0
      );
      const image =
        productInfo.images?.[0]?.image ||
        productInfo.image ||
        "/placeholder.jpg";
      const variantId = item.variantId || item.variant_id;

      if (!cartItemId || !productId) {
        console.error("Missing critical ID in cart item from backend:", item);
        throw new Error("Backend response missing cartItemId or productId.");
      }

      return {
        cartItemId: cartItemId,
        id: productId,
        name: name,
        quantity: quantity,
        sellingPrice: sellingPrice,
        basePrice: basePrice,
        image: image,
        variantId: variantId,
      };
    });
  } catch (parseError) {
    console.error(
      "LoggedInCartProvider: Error parsing cart response:",
      parseError
    );
    items = [];
  }

  console.log("LoggedInCartProvider: Parsed items:", items);
  return items;
};

export function LoggedInCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAppSelector(selectToken);
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCartItems = useCallback(async () => {
    if (!token) {
      setItems([]);
      setLoading(false);
      console.log(
        "LoggedInCartProvider: No token, clearing items and finishing fetch."
      );
      return;
    }

    setLoading(true);
    setError(null);
    console.log(
      "LoggedInCartProvider: fetchCartItems initiated. Token present."
    );
    try {
      const response = await apiCore("/cart", "GET", undefined, token);
      console.log(
        "LoggedInCartProvider: Raw response from GET /cart API call:",
        response
      );
      const fetchedItems = parseCartResponse(response);
      setItems(fetchedItems);
      console.log(
        "LoggedInCartProvider: Items set successfully after GET /cart."
      );
    } catch (err: any) {
      console.error("LoggedInCartProvider: Failed to fetch cart items:", err);
      setError(err.message || "Failed to fetch cart items.");
      setItems([]);
    } finally {
      setLoading(false);
      console.log("LoggedInCartProvider: fetchCartItems finished.");
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchCartItems();
    } else {
      setItems([]);
      setLoading(false);
    }
  }, [token, fetchCartItems]);

  const addCartItem = useCallback(
    async (itemToAdd: Omit<CartItem, "cartItemId">) => {
      if (!token) {
        console.warn("Attempted to add cart item without token (logged out).");
        return;
      }

      setError(null);
      const prevItems = [...items];

      setItems((currentItems) => {
        const existingItem = currentItems.find((item) => {
          return (
            item.id === itemToAdd.id &&
            (itemToAdd.variantId
              ? item.variantId === itemToAdd.variantId
              : true)
          );
        });

        if (existingItem) {
          return currentItems.map((item) =>
            item.cartItemId === existingItem.cartItemId
              ? { ...item, quantity: item.quantity + itemToAdd.quantity }
              : item
          );
        } else {
          const tempCartItemId = Date.now() * -1;
          return [
            ...currentItems,
            { ...itemToAdd, cartItemId: tempCartItemId },
          ];
        }
      });

      try {
        const payload = {
          productId: itemToAdd.id,
          quantity: itemToAdd.quantity,
          ...(itemToAdd.variantId && { variantId: itemToAdd.variantId }),
        };
        console.log(
          "LoggedInCartProvider: Calling API for /cart/add with payload:",
          payload
        );
        // Backend should ideally return the updated cart item or entire cart
        await apiCore("/cart/add", "POST", payload, token);
        console.log("LoggedInCartProvider: /cart/add successful.");
        await fetchCartItems(); // Re-fetch to get correct cart state from backend
      } catch (err: any) {
        console.error("LoggedInCartProvider: Failed to add cart item:", err);
        setError(err.message || "Failed to add item to cart.");
        setItems(prevItems); // Rollback on error
      }
    },
    [token, items, fetchCartItems]
  );

  const removeCartItem = useCallback(
    async (cartItemId: number) => {
      if (!token) return;
      setError(null);
      const prevItems = [...items];

      setItems((currentItems) =>
        currentItems.filter((item) => item.cartItemId !== cartItemId)
      );

      try {
        console.log(
          "LoggedInCartProvider: Calling API for /cart/remove/",
          cartItemId
        );
        await apiCore(`/cart/remove/${cartItemId}`, "DELETE", undefined, token);
        console.log("LoggedInCartProvider: /cart/remove successful.");
      } catch (err: any) {
        console.error("LoggedInCartProvider: Failed to remove cart item:", err);
        setError(err.message || "Failed to remove item from cart.");
        setItems(prevItems); // Rollback on error
      }
    },
    [token, items]
  );

  const incrementItemQuantity = useCallback(
    async (cartItemId: number) => {
      if (!token) return;
      setError(null);
      const prevItems = [...items];

      const currentItem = items.find((item) => item.cartItemId === cartItemId);
      if (!currentItem) {
        console.warn("Attempted to increment non-existent item.");
        return;
      }

      const newQuantity = currentItem.quantity + 1;

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );

      try {
        console.log(
          "LoggedInCartProvider: Calling API for /cart/update with payload:",
          { cartItemId: cartItemId, quantity: newQuantity }
        );
        await apiCore(
          `/cart/update/${cartItemId}`,
          "PUT",
          { quantity: newQuantity },
          token
        );
        console.log("LoggedInCartProvider: Increment successful.");
      } catch (err: any) {
        console.error(
          "LoggedInCartProvider: Failed to increment quantity:",
          err
        );
        setError(err.message || "Failed to increment item quantity.");
        setItems(prevItems); // Rollback on error
      }
    },
    [token, items]
  );

  const decrementItemQuantity = useCallback(
    async (cartItemId: number) => {
      if (!token) return;
      setError(null);
      const prevItems = [...items];

      const currentItem = items.find((item) => item.cartItemId === cartItemId);
      if (!currentItem) {
        console.warn("Attempted to decrement non-existent item.");
        return;
      }

      const newQuantity = currentItem.quantity - 1;

      setItems((currentItems) => {
        if (newQuantity <= 0) {
          return currentItems.filter((item) => item.cartItemId !== cartItemId);
        } else {
          return currentItems.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity: newQuantity }
              : item
          );
        }
      });

      try {
        if (newQuantity <= 0) {
          console.log(
            "LoggedInCartProvider: Decrementing to 0 or less, removing item by cartItemId:",
            cartItemId
          );
          await apiCore(
            `/cart/remove/${cartItemId}`,
            "DELETE",
            undefined,
            token
          );
        } else {
          console.log(
            "LoggedInCartProvider: Calling API for /cart/update (decrement) with payload:",
            { cartItemId: cartItemId, quantity: newQuantity }
          );
          await apiCore(
            `/cart/update/${cartItemId}`,
            "PUT",
            { quantity: newQuantity },
            token
          );
        }
        console.log("LoggedInCartProvider: Decrement successful.");
      } catch (err: any) {
        console.error(
          "LoggedInCartProvider: Failed to decrement quantity:",
          err
        );
        setError(err.message || "Failed to decrement item quantity.");
        setItems(prevItems); // Rollback on error
      }
    },
    [token, items]
  );

  const clearCart = useCallback(async () => {
    if (!token) return;
    setError(null);
    const prevItems = [...items];

    setItems([]);

    try {
      console.log("LoggedInCartProvider: Calling API for /cart/clear.");
      await apiCore("/cart/clear", "DELETE", undefined, token);
      console.log("LoggedInCartProvider: /cart/clear successful.");
    } catch (err: any) {
      console.error("LoggedInCartProvider: Failed to clear cart:", err);
      setError(err.message || "Failed to clear cart.");
      setItems(prevItems); // Rollback on error
    }
  }, [token, items]);

  const contextValue = {
    items,
    loading,
    error,
    addCartItem,
    removeCartItem,
    incrementItemQuantity,
    decrementItemQuantity,
    clearCart,
    refetchCart: fetchCartItems, // Matches the context type defined in LoggedInCartContext.ts
  };

  return (
    <LoggedInCartContext.Provider value={contextValue}>
      {children}
    </LoggedInCartContext.Provider>
  );
}

// Hook to consume the context - this is a NAMED export
export const useLoggedInCart = () => {
  const context = useContext(LoggedInCartContext);
  if (context === undefined) {
    throw new Error(
      "useLoggedInCart must be used within a LoggedInCartProvider"
    );
  }
  return context;
};
