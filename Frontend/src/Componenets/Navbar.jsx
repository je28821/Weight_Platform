import { useState } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaSearch,
  FaChevronDown,
  FaHome,
  FaBoxOpen,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../assets/Logo.png";
import { Link, Links, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Api/api";
import { clearCart } from "../Redux/Features/cart/cartSlice";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const cart = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    let res = await logout();

    if (res) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      dispatch(clearCart());
      navigate("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF4ED] border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Desktop Menu */}

          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <img
              src={logo}
              alt="Weight Scale Logo"
              className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 object-contain"
            />

            <div className="leading-tight">
              <h1 className="text-base sm:text-lg lg:text-2xl font-bold text-gray-800 whitespace-nowrap">
                Weight Scale
              </h1>

              <p className="hidden md:block text-xs text-gray-500">
                Digital Platform
              </p>
            </div>
          </Link>

          <ul className="hidden lg:flex items-center gap-8 font-medium">
            <li>
              <Link
                to="/"
                onClick={() => window.scrollTo(0, 0)}
                className="relative group px-2 py-1 text-gray-700 transition-all duration-300 hover:text-black"
              >
                Home
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                onClick={() => window.scrollTo(0, 0)}
                className="relative group px-2 py-1 text-gray-700 transition-all duration-300 hover:text-black"
              >
                About
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                onClick={() => window.scrollTo(0, 0)}
                className="relative group px-2 py-1 text-gray-700 transition-all duration-300 hover:text-black"
              >
                Contact
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard"
                onClick={() => window.scrollTo(0, 0)}
                className="relative group px-2 py-1 text-gray-700 transition-all duration-300 hover:text-black"
              >
                Dashboard
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>

            <li>
              <Link
                to="/appointment"
                onClick={() => window.scrollTo(0, 0)}
                className="relative group px-2 py-1 text-gray-700 transition-all duration-300 hover:text-black"
              >
                Appointments
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Notification */}
            <Link
              to="/notifications"
              onClick={() => window.scrollTo(0, 0)}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-110"
            >
              <FaBell className="text-xl text-gray-700" />

              {/* Notification Count */}
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs font-medium">
                3
              </span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              onClick={() => window.scrollTo(0, 0)}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-110"
            >
              <FaShoppingCart className="text-xl text-gray-700" />

              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs font-medium">
                {cart.length}
              </span>
            </Link>

            {/* Profile */}
            <Link
              to="/activity"
              onClick={() => window.scrollTo(0, 0)}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-110"
            >
              <button className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-110">
                <FaUserCircle className="text-3xl text-gray-700" />
              </button>
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H9m4 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1"
                />
              </svg>
              Logout
            </button>
          </div>

          <div className="lg:hidden flex items-center justify-between w-full bg-[#FAF4ED] px-4 py-3">
            {/* Left - Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 flex-shrink-0"
            ></Link>

            {/* Center Navigation */}
            <div className="flex items-center gap-7">
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                <FaHome className="text-2xl" />
              </Link>

              <Link
                to="/products"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                <FaBoxOpen className="text-2xl" />
              </Link>

              <Link
                to="/cart"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="relative text-gray-700 hover:text-blue-600 transition"
              >
                <FaShoppingCart className="text-2xl" />

                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center">
                  {cart.length}
                </span>
              </Link>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <Link
                to="/notifications"
                className="relative text-gray-700 hover:text-blue-600 transition"
              >
                <FaBell className="text-2xl" />

                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                  3
                </span>
              </Link>

              <Link
                to="/activity"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                <FaUserCircle className="text-2xl" />
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 transition"
              >
                <FaSignOutAlt className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
