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
import { register } from "../Api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNo: "",
    address: [
      {
        address: "",
        village: "",
        city: "",
      },
    ],
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});

    let res = await register(formData);
    if (res) {
      localStorage.setItem("token", res.token);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center px-8 xl:px-20 text-white">
        <h1 className="text-5xl xl:text-6xl font-bold mb-6 text-center">
          Join Us Today ✨
        </h1>

        <p className="max-w-lg text-lg xl:text-xl text-blue-100 leading-8 text-center">
          Create your account to unlock a secure and personalized experience.
          Manage appointments, orders, and your profile from one place.
        </p>

        <img
          src="https://illustrations.popsy.co/white/web-design.svg"
          alt=""
          className="w-80 xl:w-[450px] mt-12 animate-bounce"
        />
      </div>

      {/* RIGHT SIDE */}

      <div className="flex flex-1 justify-center items-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8">
          {/* Mobile Illustration */}

          <div className="lg:hidden flex justify-center mb-5">
            <img
              src="https://illustrations.popsy.co/white/web-design.svg"
              className="w-28 animate-bounce"
              alt=""
            />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-center text-white">
            Register
          </h1>

          <p className="text-center text-blue-100 mt-2 mb-8">
            Create your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full rounded-xl
                  bg-white/20
                  text-white
                  placeholder-gray-300
                  py-3
                  pl-12
                  pr-4
                  text-sm sm:text-base
                  outline-none
                  border
                  transition
                  ${errors.name ? "border-red-500" : "border-transparent focus:border-cyan-400"}`}
              />

              {errors.name && (
                <p className="mt-2 ml-2 text-sm text-red-400">
                  {errors.name[0]}
                </p>
              )}
            </div>

            {/* Email */}

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-gray-300" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-xl
                  bg-white/20
                  text-white
                  placeholder-gray-300
                  py-3
                  pl-12
                  pr-4
                  text-sm sm:text-base
                  outline-none
                  border
                  transition
                  ${errors.name ? "border-red-500" : "border-transparent focus:border-cyan-400"}`}
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
                className={`w-full rounded-xl
                  bg-white/20
                  text-white
                  placeholder-gray-300
                  py-3
                  pl-12
                  pr-4
                  text-sm sm:text-base
                  outline-none
                  border
                  transition
                  ${errors.name ? "border-red-500" : "border-transparent focus:border-cyan-400"}`}
              />
              {errors.password && (
                <p className="mt-2 ml-2 text-sm text-red-400">
                  {errors.password[0]}
                </p>
              )}
            </div>

            {/* Contact */}

            <div className="relative">
              <FaPhone className="absolute left-4 top-4 text-gray-300" />

              <input
                type="text"
                name="contactNo"
                placeholder="Contact Number"
                value={formData.contactNo}
                onChange={handleChange}
                className={`w-full rounded-xl
                  bg-white/20
                  text-white
                  placeholder-gray-300
                  py-3
                  pl-12
                  pr-4
                  text-sm sm:text-base
                  outline-none
                  border
                  transition
                  ${errors.name ? "border-red-500" : "border-transparent focus:border-cyan-400"}`}
              />
              {errors.contactNo && (
                <p className="mt-2 ml-2 text-sm text-red-400">
                  {errors.contactNo[0]}
                </p>
              )}
            </div>

            {/* Address */}

            <div className="relative">
              <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-300" />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address[0].address}
                onChange={handleChange}
                className={`w-full rounded-xl
                  bg-white/20
                  text-white
                  placeholder-gray-300
                  py-3
                  pl-12
                  pr-4
                  text-sm sm:text-base
                  outline-none
                  border
                  transition
                  ${errors.name ? "border-red-500" : "border-transparent focus:border-cyan-400"}`}
              />
            </div>

            {/* Village */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <FaCity className="absolute left-4 top-4 text-gray-300" />

                <input
                  type="text"
                  name="village"
                  placeholder="Village"
                  value={formData.address[0].village}
                  onChange={handleChange}
                  className={`w-full rounded-xl
                  bg-white/20
                  text-white
                  placeholder-gray-300
                  py-3
                  pl-12
                  pr-4
                  text-sm sm:text-base
                  outline-none
                  border
                  transition
                  ${errors.name ? "border-red-500" : "border-transparent focus:border-cyan-400"}`}
                />
              </div>

              <div className="relative">
                <FaCity className="absolute left-4 top-4 text-gray-300" />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.address[0].city}
                  onChange={handleChange}
                  className={`w-full rounded-xl
                    bg-white/20
                    text-white
                    placeholder-gray-300
                    py-3
                    pl-12
                    pr-4
                    text-sm sm:text-base
                    outline-none
                    border
                    transition
                    ${errors.name ? "border-red-500" : "border-transparent focus:border-cyan-400"}`}
                />
              </div>
            </div>

            {/* Button */}

            <button className="w-full mt-3 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105">
              Create Account
            </button>
          </form>

          <p className="text-center text-gray-300 mt-8 text-sm sm:text-base">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="ml-2 text-cyan-300 hover:text-white cursor-pointer font-semibold"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
