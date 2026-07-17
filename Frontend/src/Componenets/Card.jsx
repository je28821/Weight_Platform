import React from "react";
import { addtoCart } from "../Api/api";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/Features/Cart/cartapi";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { name, image, price, stock, category, description } = product;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItem);

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:-translate-y-1">
      {/* Clickable Area */}
      <Link to={`/product/${product._id}`}>
        {/* Image */}
        <div className="h-64 bg-gray-50 flex items-center justify-center overflow-hidden p-4">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Details */}
        <div className="px-5 pt-5">
          <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
            {name}
          </h2>

          <p className="text-sm text-gray-500 mt-2 line-clamp-2 h-10">
            {description.overview}
          </p>

          <div className="mt-5">
            <p className="text-gray-500 text-sm">Price</p>
            <h3 className="text-3xl font-bold text-green-600">₹{price}</h3>
          </div>
        </div>
      </Link>

      {/* Button - NOT clickable for navigation */}
      <div className="p-5 pt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToCart(product._id));
          }}
          className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
