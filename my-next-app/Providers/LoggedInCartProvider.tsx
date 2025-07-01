// Providers/LoggedInCartProvider.tsx
"use client";

import React, { useState, useEffect, useCallback, useContext } from "react";
import { useAppSelector } from "@/store/hooks/hooks";
import { selectToken } from "@/store/slices/authSlice";
import { apiCore } from "@/api/ApiCore";
import LoggedInCartContext from "./LoggedInCartContext";

import { CartItem } from "@/types/cart";
import { ProductVariant } from "@/types/product";

const parseCartResponse = (response: any): CartItem[] => {
  console.log(
    "LoggedInCartProvider: Raw response to parse (GET /cart):",
    response
  );
  let rawCartItems: any[] = [];

  try {
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
    } else if (
      response &&
      typeof response === "object" &&
      response.cart &&
      Array.isArray(response.cart.items)
    ) {
      rawCartItems = response.cart.items;
      console.log(
        "LoggedInCartProvider: Parsed as object with 'cart.items' array."
      );
    } else if (
      response &&
      typeof response === "object" &&
      Array.isArray(response.items)
    ) {
      rawCartItems = response.items;
      console.log("LoggedInCartProvider: Parsed as object with 'items' array.");
    } else {
      console.warn(
        "LoggedInCartProvider: Unexpected GET /cart response structure. Please adjust parseCartResponse.",
        response
      );
      return [];
    }

    // --- Filter out malformed or empty items before mapping ---
    const filteredRawCartItems = rawCartItems.filter((item: any) => {
      // Ensure item is an object, not null, and has a cartItemId
      const cartItemIdExists =
        item &&
        typeof item === "object" &&
        item.id !== undefined &&
        item.id !== null;

      // Ensure a valid productId source exists from the item itself, its product, or its variant
      const productIdExists =
        (item.productId !== undefined && item.productId !== null) || // Check direct item.productId
        (item.product &&
          item.product.id !== undefined &&
          item.product.id !== null) || // Check item.product.id
        (item.product &&
          item.product.productId !== undefined &&
          item.product.productId !== null) || // Check item.product.productId
        (item.variant &&
          item.variant.productId !== undefined &&
          item.variant.productId !== null); // Check item.variant.productId

      if (!cartItemIdExists || !productIdExists) {
        console.warn(
          "LoggedInCartProvider: Skipping malformed cart item due to missing critical IDs (id or product/variant productId):",
          item
        );
        return false; // Exclude this item
      }
      return true; // Include valid items
    });
    // --- END FILTER ---

    const items: CartItem[] = filteredRawCartItems.map((item: any) => {
      console.log(
        "LoggedInCartProvider: Processing valid raw cart item:",
        item
      );

      const cartItemId = item.id;
      // Prioritize item.productId (if not null), then item.product.id, then item.variant.productId
      const productId =
        item.productId || item.product?.id || item.variant?.productId;

      console.log(
        `Extracted: cartItemId = ${cartItemId}, productId = ${productId}`
      );

      if (!cartItemId || !productId) {
        // This block should ideally not be reached after filtering, but acts as a final safeguard
        console.error(
          "LoggedInCartProvider: Critical ID still missing after filter. This indicates an issue with filter logic.",
          {
            rawItem: item,
            extractedCartItemId: cartItemId,
            extractedProductId: productId,
          }
        );
        throw new Error("Backend response missing cartItemId or productId.");
      }

      const quantity = item.quantity;
      // productInfo will be item.product if your backend populates it, otherwise it defaults to the item itself.
      const productInfo = item.product || item;
      const variantInfo: ProductVariant | undefined = item.variant; // Variant details if available

      // This is the line that will get the product name.
      // 1. It first tries variantInfo.name (if a variant has its own specific name, e.g., "Red T-Shirt").
      // 2. If variantInfo.name is null/undefined, it then tries productInfo.name.
      //    **THIS is where the original product name will come from,
      //    IF your backend provides the 'product' object with its 'name' in the /cart response.**
      // 3. Finally, it defaults to "Unknown Product" if neither is found.
      const name = variantInfo?.name || productInfo.name || "Unknown Product";

      const image =
        variantInfo?.images?.[0]?.url || // Prioritize variant image
        productInfo.images?.[0]?.image || // Fallback to general product image (if productInfo is populated)
        productInfo.image ||
        "/placeholder.jpg";

      const sellingPrice = parseFloat(
        variantInfo?.selling_price || // Prioritize variant's selling price
          productInfo.sellingPrice ||
          productInfo.selling_price ||
          0
      );

      const basePrice = parseFloat(
        productInfo.basePrice || // Fallback to the main product's basePrice (as variant doesn't have it directly)
          productInfo.base_price || // Handle another potential naming for product base price
          0
      );

      const variantId = variantInfo?.id || item.variantId || item.variant_id; // Get variant ID

      console.log("LoggedInCartProvider: Mapped cart item (after parsing):", {
        cartItemId,
        id: productId, // This is the product ID that the CartItem interface expects
        name,
        quantity,
        sellingPrice,
        basePrice,
        image,
        variantId,
        rawItem: item, // Include raw item for full inspection
      });

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
    console.log("LoggedInCartProvider: Parsed items:", items);
    return items;
  } catch (parseError) {
    console.error(
      "LoggedInCartProvider: Error mapping cart items:",
      parseError
    );
    return []; // Return empty array on parsing error
  }
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
          // This logic correctly considers both productId and variantId
          return (
            item.id === itemToAdd.id && // Compares the product ID
            (itemToAdd.variantId // Checks if a variantId is provided for the item being added
              ? item.variantId === itemToAdd.variantId // If yes, it compares the variantId
              : true) // If no variantId is provided, it only matches on product ID (for base products)
          );
        });

        if (existingItem) {
          return currentItems.map((item) =>
            item.cartItemId === existingItem.cartItemId
              ? { ...item, quantity: item.quantity + itemToAdd.quantity }
              : item
          );
        } else {
          // Assign a temporary cartItemId for optimistic update until backend assigns a real one
          const tempCartItemId = Date.now() * -1;
          return [
            ...currentItems,
            { ...itemToAdd, cartItemId: tempCartItemId },
          ];
        }
      });

      try {
        // The payload correctly sends both productId and variantId to the backend
        const payload = {
          productId: itemToAdd.id, // This sends the product ID to the backend
          quantity: itemToAdd.quantity,
          ...(itemToAdd.variantId && { variantId: itemToAdd.variantId }), // Conditionally adds the variantId if present
        };
        console.log(
          "LoggedInCartProvider: Calling API for /cart/add with payload:",
          payload
        );
        await apiCore("/cart/add", "POST", payload, token);
        console.log("LoggedInCartProvider: /cart/add successful.");
        // Re-fetch to get correct cart state from backend, including new item and its full data
        await fetchCartItems();
      } catch (err: any) {
        console.error("LoggedInCartProvider: Failed to add cart item:", err);
        setError(err.message || "Failed to add item to cart.");
        setItems(prevItems); // Revert optimistic update on error
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
        setItems(prevItems);
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
          item.cartItemId === currentItem.cartItemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );

      try {
        console.log(
          "LoggedInCartProvider: Calling API for /cart/update with payload:",
          { cartItemId: currentItem.cartItemId, quantity: newQuantity }
        );
        await apiCore(
          `/cart/update/${currentItem.cartItemId}`,
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
        setItems(prevItems);
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
          return currentItems.filter(
            (item) => item.cartItemId !== currentItem.cartItemId
          );
        } else {
          return currentItems.map((item) =>
            item.cartItemId === currentItem.cartItemId
              ? { ...item, quantity: newQuantity }
              : item
          );
        }
      });

      try {
        if (newQuantity <= 0) {
          console.log(
            "LoggedInCartProvider: Decrementing to 0 or less, removing item by cartItemId:",
            currentItem.cartItemId
          );
          await apiCore(
            `/cart/remove/${currentItem.cartItemId}`,
            "DELETE",
            undefined,
            token
          );
        } else {
          console.log(
            "LoggedInCartProvider: Calling API for /cart/update (decrement) with payload:",
            { cartItemId: currentItem.cartItemId, quantity: newQuantity }
          );
          await apiCore(
            `/cart/update/${currentItem.cartItemId}`,
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
        setItems(prevItems);
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
      setItems(prevItems);
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
    refetchCart: fetchCartItems,
  };

  return (
    <LoggedInCartContext.Provider value={contextValue}>
      {children}
    </LoggedInCartContext.Provider>
  );
}

export const useLoggedInCart = () => {
  const context = useContext(LoggedInCartContext);
  if (context === undefined) {
    throw new Error(
      "useLoggedInCart must be used within a LoggedInCartProvider"
    );
  }
  return context;
};
