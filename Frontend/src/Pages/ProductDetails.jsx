import { useParams } from "react-router-dom";
import { getProduct } from "../Api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../Redux/Features/Cart/cartapi";
import { useDispatch } from "react-redux";
import { SearchX, ArrowLeft } from "lucide-react";

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
          {/* Subtle decorative background gradient */}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-gray-50 to-transparent -z-10" />

          {/* Premium Icon Container */}
          <div className="mx-auto w-24 h-24 bg-[#f8f5ef] rounded-full flex items-center justify-center mb-8 border border-white shadow-[inset_0_2px_10px_rgba(0,0,0,0.03)] relative">
            {/* Subtle pulse ring behind the icon */}
            <div className="absolute inset-0 rounded-full bg-gray-400/5 animate-pulse" />
            <SearchX className="w-10 h-10 text-gray-400" strokeWidth={1.5} />
          </div>

          {/* Typography improvements */}
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Product Not Found
          </h2>

          <p className="mt-4 text-gray-500 text-base leading-relaxed max-w-xs mx-auto">
            We've searched everywhere, but couldn't find the item you're looking
            for. It may have been moved or removed.
          </p>

          {/* Upgraded Button with hover lift and shadow */}
          <button
            onClick={() => navigate("/")}
            className="mt-10 group inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/10 hover:-translate-y-0.5 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f5ef] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg p-6">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-gray-50 rounded-2xl p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[420px] object-contain transition duration-300 hover:scale-105"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category */}
              <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-600">
                {product.category}
              </span>

              {/* Name */}
              <h1 className="mt-4 text-3xl font-bold text-gray-900">
                {product.name}
              </h1>

              {/* Price */}
              <p className="mt-4 text-4xl font-bold text-orange-600">
                ₹{product.price}
              </p>

              <hr className="my-6" />

              {/* Overview */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Overview
                </h2>

                <p className="mt-2 text-gray-600 leading-7">
                  {product.description.overview}
                </p>
              </div>

              {/* Specifications */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Specifications
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      Brand
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                      {product.description.specifications.brand}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      Capacity
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                      {product.description.specifications.capacity}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      Dimensions
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                      {product.description.specifications.dimensions}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      Weight
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                      {product.description.specifications.weight}
                    </p>
                  </div>

                  <div className="col-span-2 bg-gray-50 rounded-xl p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      Warranty
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                      {product.description.specifications.warranty}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => {
                  dispatch(addToCart(product._id));
                  navigate("/");
                }}
                className="flex-1 rounded-xl bg-orange-500 py-3 text-white font-semibold transition hover:bg-orange-600"
              >
                Add To Cart
              </button>

              <button
                onClick={() => navigate("/")}
                className="flex-1 rounded-xl border-2 border-orange-500 py-3 font-semibold text-orange-500 transition hover:bg-orange-500 hover:text-white"
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
