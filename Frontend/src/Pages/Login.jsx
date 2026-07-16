import { useState } from "react";
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

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
      // Send the Google ID token to your Express server
      const data = await loginGoogle({
        token: credentialResponse.credential,
      });
      if (data) {
        localStorage.setItem("token", data.token);
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
      return;
    }

    setErrors({});

    let res = await login(formData);
    if (res) {
      localStorage.setItem("token", res.token);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center text-white px-8 xl:px-20">
        <h1 className="text-4xl xl:text-6xl font-bold mb-6">Login Today ✨</h1>

        <p className="text-base md:text-lg xl:text-xl text-blue-100 leading-9">
          Create your account to unlock a secure and personalized experience.
          Manage your profile, track your activity, and access all features
          through a fast, modern, and reliable platform.
        </p>

        <img
          src="https://illustrations.popsy.co/white/web-design.svg"
          className="w-96 mx-auto hover:scale-105 transition duration-500"
        />
      </div>

      {/* RIGHT SIDE */}

      <div className="flex justify-center items-center w-full lg:w-1/2 px-4 py-8 sm:px-6 md:px-10">
        <div className="w-full max-w-md sm:max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-white">
            Login ✨
          </h1>

          <p className="text-center text-gray-200 mt-2 mb-8">
            Login In your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-gray-300" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-xl py-3 sm:py-4 pl-12 pr-4 text-sm sm:text-base bg-white/20 text-white placeholder-gray-300 outline-none border transition-all duration-300 ${
                  errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-transparent focus:border-cyan-400"
                }`}
              />
              {errors.email && (
                <p className="mt-2 ml-2 text-sm text-red-400">
                  {errors.email[0]}
                </p>
              )}
            </div>

            {/* Password */}

            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-gray-300" />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full rounded-xl py-3 sm:py-4 pl-12 pr-4 text-sm sm:text-base bg-white/20 text-white placeholder-gray-300 outline-none border transition-all duration-300 ${
                  errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-transparent focus:border-cyan-400"
                }`}
              />
              {errors.password && (
                <p className="mt-2 ml-2 text-sm text-red-400">
                  {errors.password[0]}
                </p>
              )}
            </div>
            {/* Button */}

            <button className="w-full mt-3 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105">
              Login Into Account
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="mx-4 text-gray-300 text-sm">OR CONTINUE WITH</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Google Login Failed")}
              theme="outline"
              size="large"
              text="continue_with"
              shape="pill"
              width="320"
            />
          </div>

          <p className="text-center text-gray-300 mt-8">
            Didn't Have an account?
            <span className="text-cyan-300 cursor-pointer hover:text-white ml-2 font-semibold">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
