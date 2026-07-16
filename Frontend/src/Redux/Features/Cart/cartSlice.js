import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  decareaseCartCount,
  fetchCart,
  increaseCartCount,
  removecart,
} from "./cartapi";

const initialState = {
  carts: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload.cart;
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.carts = action.payload;
      })

      .addCase(decareaseCartCount.fulfilled, (state, action) => {
        state.carts = action.payload;
      })

      .addCase(increaseCartCount.fulfilled, (state, action) => {
        state.carts = action.payload;
      })

      .addCase(removecart.fulfilled, (state, action) => {
        state.carts = action.payload;
      });
  },
});

export default cartSlice.reducer;
