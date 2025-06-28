// ✅ FILE: store/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AppDispatch } from "../store";
import { apiCore } from "@/api/ApiCore";

export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  sellingPrice: number;
  basePrice: number;
  image: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    addOrUpdateItem: (state, action: PayloadAction<CartItem>) => {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { setCartItems, addOrUpdateItem, deleteItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

// ✅ Async logic
export const syncCartWithServer = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const token = getState().auth.token;
  const items = getState().cart.items;

  if (token) {
    for (const item of items) {
      await apiCore("/user/cart/add-update", "POST", item);
    }
  }
};

export const fetchUserCart = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const token = getState().auth.token;
  if (!token) return;
  const res = await apiCore("/user/cart", "GET");
  dispatch(setCartItems(res.data || []));
};

export const removeFromCart = (id: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const token = getState().auth.token;
  if (token) {
    await apiCore(`/user/cart/delete-item/${id}`, "DELETE");
  }
  dispatch(deleteItem(id));
};
