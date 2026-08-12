import { addtoCart } from "../Api/api";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/Features/Cart/cartapi";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { name, image, price, stock, category, description } = product;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItem);

  return (
    <div className="group bg-white rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#C59D5F]/30 hover:-translate-y-1 flex flex-col h-full">
      {/* Clickable Area */}
      <Link to={`/product/${product._id}`} className="flex flex-col flex-grow">
        {/* Image Container - Using aspect-ratio instead of fixed height for fluid scaling */}
        <div className="relative aspect-[4/3] sm:aspect-square bg-[#FAF4ED]/40 flex items-center justify-center overflow-hidden p-4 sm:p-6 transition-colors duration-300 group-hover:bg-[#FAF4ED]/70">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-sm"
          />
        </div>

        {/* Details */}
        <div className="px-4 sm:px-5 pt-4 sm:pt-5 flex flex-col flex-grow">
          <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 line-clamp-1 tracking-tight">
            {name}
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 mt-1.5 sm:mt-2 line-clamp-2 leading-relaxed">
            {description.overview}
          </p>

          {/* mt-auto pushes the price to the bottom consistently if descriptions vary in length */}
          <div className="mt-auto pt-4 sm:pt-5">
            <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-widest mb-0.5">
              Price
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#C59D5F]">
              ₹{price}
            </h3>
          </div>
        </div>
      </Link>

      {/* Cart Button */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-4 mt-auto">
        <button
          onClick={(e) => {
            // Prevent default isn't strictly necessary since it's outside the Link,
            // but keeps the click isolated from any unexpected bubbling
            dispatch(addToCart(product._id));
          }}
          className="w-full bg-[#111827] text-white py-3 sm:py-3.5 rounded-xl hover:bg-black transition-all duration-300 font-semibold active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#111827] focus:ring-offset-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
