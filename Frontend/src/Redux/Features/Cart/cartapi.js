import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addtoCart,
  cartRemove,
  countDCart,
  countICart,
  getCartData,
} from "../../../Api/api";

export const addToCart = createAsyncThunk(
  "cart/addToCart",

  async (productId) => {
    const res = await addtoCart(productId);
    return res;
  },
);

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  try {
    const res = await getCartData();

    return res.cart;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const decareaseCartCount = createAsyncThunk(
  "cart/countDCart",
  async (id, { rejectWithValue }) => {
    try {
      const res = await countDCart(id);
      return res.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const increaseCartCount = createAsyncThunk(
  "cart/countICart",
  async (id, { rejectWithValue }) => {
    try {
      const res = await countICart(id);
      return res.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const removecart = createAsyncThunk(
  "cart/removecart",
  async (id, { rejectWithValue }) => {
    try {
      const res = await cartRemove(id);
      return res.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);
