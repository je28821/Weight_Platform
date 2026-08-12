import { useState, useEffect } from "react";
import { registerSchema } from "../Validator/registerValidator";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
} from "react-icons/fa";
import { loginSchema } from "../Validator/loginValidator";
import { GoogleLogin } from "@react-oauth/google";
import { login, loginGoogle } from "../Api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCart } from "../Redux/Features/Cart/cartapi";
import { toast } from "react-toastify";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["address", "village", "city"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: [
          {
            ...prev.address[0],
            [name]: value,
          },
        ],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const data = await loginGoogle({
        token: credentialResponse.credential,
      });

      if (data) {
        localStorage.setItem("token", data.token);

        await dispatch(fetchCart());

        localStorage.setItem("justLoggedIn", "true");

        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in to backend:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      toast.error("Please Fill The Details Properly!!!.");
      return;
    }

    setErrors({});
    try {
      const res = await login(formData);
      if (res) {
        localStorage.setItem("token", res.token);

        await dispatch(fetchCart());

        localStorage.setItem("justLoggedIn", "true");

        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);

      toast.error(
        err?.response?.message ||
          err?.message ||
          "Login failed. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center px-8 xl:px-20 text-white">
        <h1 className="text-5xl xl:text-6xl font-bold mb-6 text-center">
          Login Today ✨
        </h1>

        <p className="max-w-lg text-lg xl:text-xl text-blue-100 text-center leading-8">
          Login to access your dashboard, manage appointments, orders, and enjoy
          a secure personalized experience.
        </p>

        <img
          src="https://illustrations.popsy.co/white/web-design.svg"
          alt="Illustration"
          className="w-80 xl:w-[450px] mt-12 animate-bounce"
        />
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-5">
            <img
              src="https://illustrations.popsy.co/white/web-design.svg"
              className="w-28 animate-bounce"
              alt=""
            />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white">
            Welcome Back
          </h2>

          <p className="text-center text-blue-100 mt-2 mb-8">
            Login to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}

            <div>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className={`w-full rounded-xl bg-white/20 text-white placeholder-gray-300 py-3 pl-12 pr-4 outline-none border transition ${
                    errors.email
                      ? "border-red-500"
                      : "border-transparent focus:border-cyan-400"
                  }`}
                />
              </div>

              {errors.email && (
                <p className="mt-2 text-sm text-red-300">{errors.email[0]}</p>
              )}
            </div>

            {/* Password */}

            <div>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={`w-full rounded-xl bg-white/20 text-white placeholder-gray-300 py-3 pl-12 pr-4 outline-none border transition ${
                    errors.password
                      ? "border-red-500"
                      : "border-transparent focus:border-cyan-400"
                  }`}
                />
              </div>

              {errors.password && (
                <p className="mt-2 text-sm text-red-300">
                  {errors.password[0]}
                </p>
              )}
            </div>

            {/* Login Button */}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white font-semibold transition hover:scale-[1.02]"
            >
              Login
            </button>
          </form>

          {/* Divider */}

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-white/20"></div>

            <span className="mx-4 text-xs sm:text-sm text-gray-300 whitespace-nowrap">
              OR CONTINUE WITH
            </span>

            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Google */}

          <div className="flex justify-center overflow-hidden">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Google Login Failed")}
              theme="outline"
              shape="pill"
              text="continue_with"
              width="100%"
            />
          </div>

          {/* Register */}

          <p className="text-center text-gray-300 mt-8 text-sm sm:text-base">
            Don't have an account?
            <span
              onClick={() => navigate("/register")}
              className="ml-2 font-semibold text-cyan-300 hover:text-white cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
