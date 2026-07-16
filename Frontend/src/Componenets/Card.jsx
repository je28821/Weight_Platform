import React from "react";
import { addtoCart } from "../Api/api";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/Features/Cart/cartapi";

const ProductCard = ({ product }) => {
  const { name, image, price, stock, category, description } = product;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItem);

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
        />

        <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
          {category}
        </span>

        {stock > 0 ? (
          <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
            In Stock
          </span>
        ) : (
          <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
            Out of Stock
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 line-clamp-1">{name}</h2>

        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {description.overview}
        </p>

        {/* Price & Button */}
        <div className="flex items-center justify-between mt-6">
          <div>
            <p className="text-gray-500 text-sm">Price</p>
            <h3 className="text-3xl font-bold text-green-600">₹{price}</h3>
          </div>

          <button
            className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
            onClick={() => dispatch(addToCart(product._id))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
