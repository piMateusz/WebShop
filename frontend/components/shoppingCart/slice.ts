import { createSlice } from '@reduxjs/toolkit';

import { shoppingCartProperties } from './type';

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState: {
    cart: [] as shoppingCartProperties[],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item)
        item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item && item.quantity === 1) {
        item.quantity = 1
      } else if (item) {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item.id !== action.payload);
      state.cart = removeItem;
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;