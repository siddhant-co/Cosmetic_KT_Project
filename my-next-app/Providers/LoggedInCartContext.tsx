// providers/LoggedInCartContext.tsx
import { createContext, useContext } from "react";
import { CartItem } from "@/types/cart"; // Import CartItem from central location

interface LoggedInCartContextType {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  addCartItem: (itemToAdd: Omit<CartItem, "cartItemId">) => Promise<void>;
  removeCartItem: (cartItemId: number) => Promise<void>;
  incrementItemQuantity: (cartItemId: number) => Promise<void>;
  decrementItemQuantity: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refetchCart: () => Promise<void>;
}

const LoggedInCartContext = createContext<LoggedInCartContextType | undefined>(
  undefined
);

// FIX: Ensure 'export' keyword is here for the hook
export function useLoggedInCart() {
  const context = useContext(LoggedInCartContext);
  if (context === undefined) {
    throw new Error(
      "useLoggedInCart must be used within a LoggedInCartProvider"
    );
  }
  return context;
}

export default LoggedInCartContext;
