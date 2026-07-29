import { FaMoneyBillWave, FaCreditCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createOrder } from "../Api/api";
import { clearCart } from "../Redux/Features/Cart/cartapi";

export default function OrderForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.carts);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const shipping = 0;
  const gst = Math.round(subtotal * 0.0);
  const total = subtotal + shipping + gst;

  const handleOrder = async () => {
    try {
      const res = await createOrder();

      if (res.success) {
        dispatch(clearCart());

        toast.success("Order placed successfully!");

        navigate("/activity", {
          state: { activeTab: "orders" },
        });
      } else {
        toast.error(res.message || "Failed to place order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="min-h-screen bg-[#FAF4ED] py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Order Confirmation
        </h1>

        {/* Order Summary */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Order Summary
          </h2>

          <div className="space-y-5">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between gap-4 p-4 rounded-xl border border-gray-200 bg-gray-50"
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover border"
                  />

                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {item.product.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {item.product.category}
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      ₹{item.product.price.toLocaleString()} × {item.quantity}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>

                  <p className="text-xl font-bold text-blue-600">
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="mt-8 rounded-xl bg-[#FAF4ED] p-5 border border-[#E8DCCB]">
            <div className="flex justify-between mb-3">
              <span className="text-gray-600">Subtotal</span>

              <span className="font-medium">₹{subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span className="text-gray-600">Shipping</span>

              <span className="font-medium text-green-600">Free</span>
            </div>

            <div className="flex justify-between mb-4">
              <span className="text-gray-600">GST (5%)</span>

              <span className="font-medium">₹{gst.toLocaleString()}</span>
            </div>

            <hr className="border-dashed" />

            <div className="flex justify-between mt-4">
              <span className="text-xl font-bold">Grand Total</span>

              <span className="text-2xl font-bold text-blue-600">
                ₹{total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-10">
          <button
            onClick={() => navigate("/cart")}
            className="flex-1 border border-gray-300 py-3 rounded-xl hover:bg-gray-100"
          >
            Back
          </button>

          <button
            onClick={handleOrder}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
