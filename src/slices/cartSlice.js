import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    emptyCart(state) {
      state.cart = [];
    },
    deleteItem(state, action) {
      const itemToDelete = state.cart.find(
        (item) => action.payload === item.pizzaId
      );
      state.cart = state.cart.filter((item) => item.name !== itemToDelete.name);
    },

    increaseItem(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalItemPrice = item.quantity * item.unitPrice;
    },
    decreaseItem(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item.quantity <= 1) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
      item.quantity--;
      item.totalItemPrice = item.quantity * item.unitPrice;
    },
  },
});
export default cartSlice.reducer;
export const { addItem, deleteItem, emptyCart, increaseItem, decreaseItem } =
  cartSlice.actions;
