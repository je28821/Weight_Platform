import { useState } from "react";
import {
  FaShoppingCart,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaHome,
  FaSignOutAlt,
  FaInfoCircle,
  FaPhoneAlt,
  FaThLarge,
  FaCalendarAlt,
} from "react-icons/fa";
import logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Api/api";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const cart = useSelector((state) => state.cart.carts);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  // Clean, reusable boolean for logic checks
  const isAdmin = user?.role === "admin";

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

  // Helper function to close mobile menu and scroll to top
  const handleNavClick = () => {
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF4ED] border-b border-gray-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* ================= LOGO (Left) ================= */}
          <Link
            to="/"
            onClick={handleNavClick}
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

          {/* ================= DESKTOP LINKS (Center) ================= */}
          <ul className="hidden lg:flex items-center gap-8 font-medium">
            {!isAdmin ? (
              // User Links
              <>
                <Link
                  to="/"
                  onClick={handleNavClick}
                  className="relative group px-2 py-1 text-gray-700 hover:text-black"
                >
                  Home
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link
                  to="/about"
                  onClick={handleNavClick}
                  className="relative group px-2 py-1 text-gray-700 hover:text-black"
                >
                  About
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link
                  to="/contact"
                  onClick={handleNavClick}
                  className="relative group px-2 py-1 text-gray-700 hover:text-black"
                >
                  Contact
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </>
            ) : (
              // Admin Links
              <>
                <Link
                  to="/"
                  onClick={handleNavClick}
                  className="relative group px-2 py-1 text-gray-700 hover:text-black"
                >
                  Home
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link
                  to="/dashboard"
                  onClick={handleNavClick}
                  className="relative group px-2 py-1 text-gray-700 hover:text-black"
                >
                  Dashboard
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link
                  to="/appointment"
                  onClick={handleNavClick}
                  className="relative group px-2 py-1 text-gray-700 hover:text-black"
                >
                  Appointments
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </>
            )}
          </ul>

          {/* ================= DESKTOP ACTIONS (Right) ================= */}
          <div className="hidden lg:flex items-center gap-5">
            {!isAdmin && (
              <>
                <Link
                  to="/cart"
                  onClick={handleNavClick}
                  className="relative p-2 rounded-full hover:bg-gray-200 transition-all duration-300"
                >
                  <FaShoppingCart className="text-xl text-gray-700" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs font-medium">
                    {cart.length}
                  </span>
                </Link>
                <Link
                  to="/activity"
                  onClick={handleNavClick}
                  className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300"
                >
                  <FaUserCircle className="text-2xl text-gray-700" />
                </Link>
              </>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-all duration-300 shadow-sm hover:shadow"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>

          {/* ================= MOBILE NAV BAR ================= */}
          <div className="lg:hidden flex items-center gap-3">
            {!isAdmin && (
              <Link
                to="/cart"
                onClick={handleNavClick}
                className="relative p-2 text-gray-700 hover:text-black"
              >
                <FaShoppingCart className="text-[22px]" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-[#FAF4ED]">
                  {cart.length}
                </span>
              </Link>
            )}

            {/* Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="p-2 text-gray-700 focus:outline-none"
            >
              {mobileMenu ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU DRAWER ================= */}
      {mobileMenu && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#FAF4ED] border-b border-gray-200 shadow-md py-4 px-6 flex flex-col gap-4">
          {!isAdmin ? (
            <>
              <Link
                to="/"
                onClick={handleNavClick}
                className="flex items-center gap-3 text-lg text-gray-700 hover:text-blue-600"
              >
                <FaHome className="text-xl" /> Home
              </Link>
              <Link
                to="/about"
                onClick={handleNavClick}
                className="flex items-center gap-3 text-lg text-gray-700 hover:text-blue-600"
              >
                <FaInfoCircle className="text-xl" /> About
              </Link>
              <Link
                to="/contact"
                onClick={handleNavClick}
                className="flex items-center gap-3 text-lg text-gray-700 hover:text-blue-600"
              >
                <FaPhoneAlt className="text-xl" /> Contact
              </Link>
              <Link
                to="/activity"
                onClick={handleNavClick}
                className="flex items-center gap-3 text-lg text-gray-700 hover:text-blue-600"
              >
                <FaUserCircle className="text-xl" /> Activity
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                onClick={handleNavClick}
                className="flex items-center gap-3 text-lg text-gray-700 hover:text-blue-600"
              >
                <FaHome className="text-xl" /> Home
              </Link>
              <Link
                to="/dashboard"
                onClick={handleNavClick}
                className="flex items-center gap-3 text-lg text-gray-700 hover:text-blue-600"
              >
                <FaThLarge className="text-xl" /> Dashboard
              </Link>
              <Link
                to="/appointment"
                onClick={handleNavClick}
                className="flex items-center gap-3 text-lg text-gray-700 hover:text-blue-600"
              >
                <FaCalendarAlt className="text-xl" /> Appointments
              </Link>
            </>
          )}

          <hr className="border-gray-300" />

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full mt-2 py-3 rounded-lg bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-all"
          >
            <FaSignOutAlt className="text-xl" /> Logout
          </button>
        </div>
      )}
    </nav>
  );
}
