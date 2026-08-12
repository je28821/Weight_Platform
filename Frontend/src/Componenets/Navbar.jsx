import { useState, useEffect, useRef } from "react";
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
  FaInfoCircle,
  FaPhoneAlt,
} from "react-icons/fa";
import logo from "../assets/Logo.png";
import { Link, Links, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Api/api";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  const cart = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notificationRef = useRef(null);
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  const handleLogout = async () => {
    try {
      let res = await logout();

      if (res) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
        toast.success("Logout successfully");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.message || error?.message || "Something went wrong",
      );
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
              {user?.role === "admin" && (
                <Link
                  to="/dashboard"
                  onClick={() => window.scrollTo(0, 0)}
                  className="relative group px-2 py-1 text-gray-700 transition-all duration-300 hover:text-black"
                >
                  Dashboard
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )}
            </li>

            <li>
              {user?.role === "admin" && (
                <Link
                  to="/appointment"
                  onClick={() => window.scrollTo(0, 0)}
                  className="relative group px-2 py-1 text-gray-700 transition-all duration-300 hover:text-black"
                >
                  Appointments
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )}
            </li>
          </ul>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Cart */}
            {user?.role !== "admin" && (
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
            )}

            {/* Profile */}
            {user?.role !== "admin" && (
              <Link
                to="/activity"
                onClick={() => window.scrollTo(0, 0)}
                className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-110"
              >
                <button className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-110">
                  <FaUserCircle className="text-3xl text-gray-700" />
                </button>
              </Link>
            )}

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

          <div className="lg:hidden sticky top-0 z-50 flex items-center justify-between w-full  px-2 sm:px-4 py-2 sm:py-3 ">
            {/* Left - Logo Placeholder */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              {/* Logo goes here */}
            </Link>

            {/* Center Navigation */}
            <div className="flex items-center gap-0.5 sm:gap-2">
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="p-2 sm:p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all active:scale-95"
              >
                <FaHome className="text-[20px] sm:text-2xl" />
              </Link>

              <Link
                to="/about"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="p-2 sm:p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all active:scale-95"
              >
                <FaInfoCircle className="text-[20px] sm:text-2xl" />
              </Link>

              <Link
                to="/contact"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="p-2 sm:p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all active:scale-95"
              >
                <FaPhoneAlt className="text-[20px] sm:text-2xl" />
              </Link>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-0.5 sm:gap-2">
              <Link
                to="/cart"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="relative p-2 sm:p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all active:scale-95"
              >
                <FaShoppingCart className="text-[20px] sm:text-2xl" />

                {/* Cart Badge */}
                <span className="absolute top-0 right-0 min-w-[18px] sm:min-w-[20px] h-[18px] sm:h-[20px] bg-black text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-[#FAF4ED] shadow-sm">
                  {cart.length}
                </span>
              </Link>

              <Link
                to="/notifications"
                className="relative p-2 sm:p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all active:scale-95"
              >
                <FaBell className="text-[20px] sm:text-2xl" />

                {/* Notification Badge */}
                <span className="absolute top-0 right-0 min-w-[18px] sm:min-w-[20px] h-[18px] sm:h-[20px] bg-red-500 text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-[#FAF4ED] shadow-sm">
                  3
                </span>
              </Link>

              <Link
                to="/activity"
                className="p-2 sm:p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all active:scale-95"
              >
                <FaUserCircle className="text-[20px] sm:text-2xl" />
              </Link>

              <button
                onClick={handleLogout}
                className="p-2 sm:p-2.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all active:scale-95"
              >
                <FaSignOutAlt className="text-[20px] sm:text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
