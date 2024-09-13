import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          JSON.stringify(item.modifiers) === JSON.stringify(action.payload.modifiers)
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
    },
    removeItem: (state, action) => {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          JSON.stringify(item.modifiers) === JSON.stringify(action.payload.modifiers)
      );

      if (existingItem) {
        // If the item quantity is greater than 1, decrease it
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          // Otherwise, remove the item from the cart
          state.items = state.items.filter(
            (item) => item !== existingItem
          );
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;