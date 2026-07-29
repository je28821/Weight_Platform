import { useParams } from "react-router-dom";
import { getProduct } from "../Api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../Redux/Features/Cart/cartapi";
import { useDispatch } from "react-redux";
import {
  ShoppingCart,
  Zap,
  ShieldCheck,
  Maximize,
  Weight,
  Tag,
  SearchX,
  ArrowLeft,
} from "lucide-react";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data.cart);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f5ef] p-6">
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-10 sm:p-14 text-center max-w-lg w-full relative z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-gray-50 to-transparent -z-10" />
          <div className="mx-auto w-24 h-24 bg-[#f8f5ef] rounded-full flex items-center justify-center mb-8 border border-white shadow-[inset_0_2px_10px_rgba(0,0,0,0.03)] relative">
            <div className="absolute inset-0 rounded-full bg-gray-400/5 animate-pulse" />
            <SearchX className="w-10 h-10 text-gray-400" strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Product Not Found
          </h2>
          <p className="mt-4 text-gray-500 text-base leading-relaxed max-w-xs mx-auto">
            We've searched everywhere, but couldn't find the item you're looking
            for.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-10 group inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/10 hover:-translate-y-0.5 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f5ef] py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Product Card */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 sm:p-8 lg:p-10 grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Product Image Showcase */}
          <div className="relative group rounded-3xl bg-gradient-to-b from-gray-50 to-gray-100/50 p-8 flex items-center justify-center border border-gray-100 overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-white/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <img
              src={product.image}
              alt={product.name}
              className="relative z-10 w-full max-w-md h-[400px] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />

            {/* Optional: Stock Badge inside image area */}
            <div className="absolute top-6 left-6 z-20">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-emerald-600 shadow-sm border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                In Stock
              </span>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col justify-center">
            {/* Header Section */}
            <div>
              <span className="inline-flex items-center rounded-lg bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-600 border border-orange-100">
                {product.category}
              </span>

              <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-gray-900">
                  ₹{product.price}
                </span>
                <span className="text-lg text-gray-400 font-medium line-through">
                  ₹{Math.round(product.price * 1.2)}{" "}
                  {/* Example original price markup */}
                </span>
              </div>
            </div>

            <hr className="my-8 border-gray-100" />

            {/* Overview */}
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">
                Overview
              </h2>
              <p className="text-gray-500 leading-relaxed text-base">
                {product.description.overview}
              </p>
            </div>

            {/* Premium Specifications Grid */}
            <div className="mt-10">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">
                Key Specifications
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-gray-100/50 transition-colors">
                  <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-400">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold mb-0.5">
                      Brand
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      {product.description.specifications.brand}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-gray-100/50 transition-colors">
                  <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-400">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold mb-0.5">
                      Capacity
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      {product.description.specifications.capacity}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-gray-100/50 transition-colors">
                  <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-400">
                    <Maximize className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold mb-0.5">
                      Dimensions
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      {product.description.specifications.dimensions}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-gray-100/50 transition-colors">
                  <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-400">
                    <Weight className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold mb-0.5">
                      Weight
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      {product.description.specifications.weight}
                    </p>
                  </div>
                </div>

                <div className="col-span-2 flex items-start gap-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                  <div className="p-2 bg-white rounded-xl shadow-sm border border-blue-100 text-blue-500">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-blue-600/80 font-bold mb-0.5">
                      Warranty
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      {product.description.specifications.warranty} Coverage
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button
                onClick={() => {
                  dispatch(addToCart(product._id));
                  // navigate("/"); Optional: Consider showing a toast instead of redirecting immediately
                }}
                className="flex-1 group relative flex items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 px-8 text-white font-bold text-lg hover:bg-orange-600 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all active:scale-[0.98]"
              >
                <ShoppingCart className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Add To Cart
              </button>

              <button
                onClick={() => navigate("/checkout")}
                className="flex-1 rounded-2xl bg-gray-900 py-4 px-8 text-white font-bold text-lg hover:bg-black shadow-lg shadow-gray-900/10 hover:shadow-gray-900/20 transition-all active:scale-[0.98]"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
