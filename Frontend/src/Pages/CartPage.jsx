import { useEffect, useState } from "react";
import { getCartData } from "../Api/api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decareaseCartCount,
  fetchCart,
  increaseCartCount,
  removecart,
} from "../Redux/Features/Cart/cartapi";

const CartPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.carts);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const total = cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <>
      <div className="min-h-screen bg-[#FAF4ED] py-8 sm:py-12 overflow-x-hidden font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-8 sm:mb-10 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Review your selected products before checkout.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Cart Items List */}
            <div className="space-y-4 sm:space-y-6 lg:col-span-8 xl:col-span-8">
              {cart.length === 0 ? (
                <div className="rounded-2xl sm:rounded-3xl bg-white p-8 sm:p-14 text-center shadow-lg border border-gray-100 flex flex-col items-center justify-center min-h-[40vh]">
                  <div className="text-6xl sm:text-7xl mb-4">🛒</div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Your Cart is Empty
                  </h2>
                  <p className="text-sm sm:text-base text-gray-500 mb-8 max-w-sm mx-auto">
                    Looks like you haven't added anything yet. Discover our
                    premium scale collections.
                  </p>
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate("/");
                    }}
                    className="w-full sm:w-auto rounded-xl bg-gray-900 px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:bg-[#C59D5F] hover:shadow-lg active:scale-[0.98]"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product._id}
                    className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      {/* ---------- Clickable Area (Image & Details) ---------- */}
                      <div
                        onClick={() => navigate(`/product/${item.product._id}`)}
                        className="flex flex-1 cursor-pointer flex-row gap-4 sm:gap-6 group"
                      >
                        {/* Image */}
                        <div className="shrink-0 flex items-center justify-center">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-xl sm:rounded-2xl object-cover border border-gray-50 group-hover:opacity-90 transition-opacity"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col justify-center flex-1 py-1 sm:py-2">
                          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 line-clamp-2 leading-tight">
                            {item.product.name}
                          </h2>
                          <span className="mt-2 inline-block w-fit rounded-full bg-[#FAF4ED] border border-[#C59D5F]/30 px-3 py-1 text-xs sm:text-sm font-semibold text-[#C59D5F]">
                            {item.product.category}
                          </span>
                          <p className="mt-auto pt-3 sm:pt-4 text-xl sm:text-2xl font-extrabold text-gray-900">
                            ₹{item.product.price}
                          </p>
                        </div>
                      </div>

                      {/* ---------- Cart Controls ---------- */}
                      <div className="flex flex-row sm:flex-col justify-between items-center sm:items-end w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-none border-gray-100 shrink-0">
                        {/* Quantity Control */}
                        <div className="flex flex-col items-start sm:items-end">
                          <p className="hidden sm:block mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </p>
                          <div className="flex items-center rounded-lg sm:rounded-xl border border-gray-200 bg-gray-50/50 overflow-hidden">
                            <button
                              onClick={() =>
                                dispatch(decareaseCartCount(item.product._id))
                              }
                              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl text-gray-600 hover:bg-white hover:text-gray-900 transition-colors focus:outline-none"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="w-10 sm:w-12 text-center font-semibold text-gray-900 text-sm sm:text-base">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                dispatch(increaseCartCount(item.product._id))
                              }
                              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl text-gray-600 hover:bg-white hover:text-gray-900 transition-colors focus:outline-none"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => dispatch(removecart(item.product._id))}
                          className="rounded-lg sm:rounded-xl bg-red-50 px-4 sm:px-6 py-2 sm:py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-200"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4 xl:col-span-4 mt-8 lg:mt-0">
              <div className="sticky top-24 rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-gray-100">
                <h2 className="mb-6 sm:mb-8 text-2xl sm:text-3xl font-extrabold text-gray-900">
                  Order Summary
                </h2>

                <div className="space-y-4 sm:space-y-5">
                  <div className="flex justify-between text-sm sm:text-base text-gray-600">
                    <span>Total Items</span>
                    <span className="font-semibold text-gray-900">
                      {cart.length}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm sm:text-base text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600 tracking-wide uppercase text-xs sm:text-sm mt-0.5">
                      Free
                    </span>
                  </div>

                  <div className="flex justify-between text-sm sm:text-base text-gray-600">
                    <span>Tax</span>
                    <span className="font-semibold text-gray-900">₹0</span>
                  </div>

                  <hr className="border-gray-200 my-4" />

                  <div className="flex justify-between items-end">
                    <span className="text-lg sm:text-xl font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#C59D5F]">
                      ₹{total}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 sm:mt-10 space-y-3 sm:space-y-4">
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate("/orderform");
                    }}
                    disabled={cart.length === 0}
                    className="w-full rounded-xl bg-gray-900 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:bg-black hover:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none active:scale-[0.98]"
                  >
                    Proceed to Payment
                  </button>

                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate("/products");
                    }}
                    className="w-full rounded-xl border-2 border-gray-900 bg-transparent py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-gray-900 transition-all duration-300 hover:bg-gray-50 active:scale-[0.98]"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
