import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/Features/Cart/cartapi";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProductCard = ({ product }) => {
  const { name, image, price, description } = product;

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  return (
    <div className="group bg-white rounded-xl sm:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#C59D5F]/30 hover:-translate-y-1 flex flex-col h-full">
      {/* Clickable Area */}
      <Link
        to={`/product/${product._id}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex flex-col flex-grow"
      >
        {" "}
        {/* Image Container - Switched to aspect-square with tighter mobile padding */}
        <div className="relative aspect-square bg-[#FAF4ED]/40 flex items-center justify-center overflow-hidden p-2 sm:p-6 transition-colors duration-300 group-hover:bg-[#FAF4ED]/70">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-sm"
          />
        </div>
        {/* Details - Tighter padding on mobile (px-3 pt-3) */}
        <div className="px-3 sm:px-5 pt-3 sm:pt-5 flex flex-col flex-grow">
          {/* Title - Smaller on mobile */}
          <h2 className="text-sm sm:text-xl font-extrabold text-gray-900 line-clamp-2 sm:line-clamp-1 tracking-tight leading-snug">
            {name}
          </h2>

          {/* Description - Hidden on very small screens or clamped to 2 lines */}
          <p className="text-[10px] sm:text-sm text-gray-500 mt-1 sm:mt-2 line-clamp-2 leading-relaxed">
            {description?.overview}
          </p>

          <div className="mt-auto pt-3 sm:pt-5">
            <p className="text-[8px] sm:text-xs text-gray-400 font-bold uppercase tracking-widest mb-0.5">
              Price
            </p>
            {/* Price - Scaled down for mobile */}
            <h3 className="text-lg sm:text-3xl font-extrabold text-[#C59D5F] mb-2 sm:mb-4">
              ₹{price}
            </h3>
          </div>
        </div>
      </Link>

      {/* Cart Button */}
      {user?.role !== "admin" && (
        <div className="px-3 sm:px-5 pb-3 sm:pb-5 pt-1 sm:pt-4 mt-auto">
          <button
            onClick={(e) => {
              e.preventDefault(); // Good practice to prevent any link clicking behavior if button overlaps
              dispatch(addToCart(product._id));
            }}
            className="w-full bg-[#111827] text-white py-2 sm:py-3.5 rounded-lg sm:rounded-xl hover:bg-black transition-all duration-300 font-semibold active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-xs sm:text-base focus:outline-none focus:ring-2 focus:ring-[#111827] focus:ring-offset-2"
          >
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
