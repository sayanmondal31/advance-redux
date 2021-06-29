import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  cartItems: [],
  totaItem: 0,
  totalAmount: 0,
  totalPrice: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
      state.totaItem = action.payload.totaItem;
      state.cartItems = action.payload.cartItems;
    },
    addToCart(state, action) {
      // extract item from action
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totaItem++;
      state.changed = true;
      const toBeAddedItem = {
        id: newItem.id,
        title: newItem.title,
        price: newItem.price,
        quantity: 1,
        totalPrice: newItem.price,
      };
      if (!existingItem) {
        state.cartItems.push(toBeAddedItem);
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      state.totaItem--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalAmount = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
