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
      <div className="min-h-screen bg-[#FAF4ED] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="mt-2 text-gray-600">
              Review your selected products before checkout.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-6 lg:col-span-2">
              {cart.length === 0 ? (
                <div className="rounded-3xl bg-white p-14 text-center shadow-xl">
                  <div className="text-7xl">🛒</div>

                  <h2 className="mt-6 text-3xl font-bold text-gray-800">
                    Your Cart is Empty
                  </h2>

                  <p className="mt-3 text-gray-500">
                    Looks like you haven't added anything yet.
                  </p>

                  <button
                    onClick={() => navigate("/")}
                    className="mt-8 rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product._id}
                    className="rounded-3xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* ---------- Clickable Area ---------- */}
                      <div
                        onClick={() => navigate(`/product/${item.product._id}`)}
                        className="flex flex-1 cursor-pointer gap-6"
                      >
                        {/* Image */}
                        <div className="flex justify-center">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-44 w-44 rounded-2xl object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col justify-center">
                          <h2 className="text-2xl font-bold text-gray-900">
                            {item.product.name}
                          </h2>

                          <p className="mt-2 inline-block w-fit rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                            {item.product.category}
                          </p>

                          <p className="mt-5 text-3xl font-bold text-indigo-600">
                            ₹{item.product.price}
                          </p>
                        </div>
                      </div>

                      {/* ---------- Cart Controls ---------- */}
                      <div className="flex flex-col justify-between items-end">
                        {/* Quantity */}
                        <div>
                          <p className="mb-2 text-sm text-gray-500">
                            Quantity : {item.quantity}
                          </p>

                          <div className="flex items-center rounded-xl border">
                            <button
                              onClick={() =>
                                dispatch(decareaseCartCount(item.product._id))
                              }
                              className="px-4 py-2 text-xl hover:bg-gray-100"
                            >
                              -
                            </button>

                            <span className="px-5 font-semibold">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                dispatch(increaseCartCount(item.product._id))
                              }
                              className="px-4 py-2 text-xl hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => dispatch(removecart(item.product._id))}
                          className="mt-6 rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Order Summary */}

            <div>
              <div className="sticky top-24 rounded-3xl bg-white p-8 shadow-xl">
                <h2 className="mb-8 text-3xl font-bold text-gray-900">
                  Order Summary
                </h2>

                <div className="space-y-5">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Total Items</span>

                    <span className="font-semibold">{cart.length}</span>
                  </div>

                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Shipping</span>

                    <span className="font-semibold text-green-600">Free</span>
                  </div>

                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Tax</span>

                    <span>₹0</span>
                  </div>

                  <hr />

                  <div className="flex justify-between text-3xl font-bold">
                    <span>Total</span>

                    <span className="text-indigo-600">₹{total}</span>
                  </div>
                </div>

                <button
                  onClick={() => window.scrollTo(0, 0)}
                  onClick={() => navigate("/orderform")}
                  className="mt-10 w-full rounded-xl bg-indigo-600 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  Proceed to Payment
                </button>

                <Link to={"/"}>
                  <button
                    onClick={() => window.scrollTo(0, 0)}
                    onClick={() => navigate("/products")}
                    className="mt-4 w-full rounded-xl border border-indigo-600 py-4 font-semibold text-indigo-600 transition hover:bg-indigo-50"
                  >
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
