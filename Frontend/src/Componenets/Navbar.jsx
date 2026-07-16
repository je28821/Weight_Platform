import { useState } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import logo from "../assets/Logo.png";
import { Link, Links, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../Api/api";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const cart = useSelector((state) => state.cart.carts);
  const navigate = useNavigate();

  const handleLogout = async () => {
    let res = await logout();
    console.log(res);
    if (res) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
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
            onClick={() => window.scrollTo(0, 0)}
            className="flex items-center gap-2"
          >
            <img src={logo} alt="logo" className="w-10 h-10 lg:w-12 lg:h-12" />

            <div>
              <h1 className="text-lg lg:text-2xl font-bold">Weight Scale</h1>

              <p className="hidden lg:block text-xs text-gray-500">
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
          </ul>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center gap-5">
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
            <button className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-110">
              <FaUserCircle className="text-3xl text-gray-700" />
            </button>

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

          {/* Mobile Right Side */}
          <div className="flex items-center gap-4 lg:hidden">
            <Link
              to="/cart"
              onClick={() => window.scrollTo(0, 0)}
              className="relative"
            >
              <FaShoppingCart className="text-2xl" />

              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs">
                {cart.length}
              </span>
            </Link>

            <button onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-4">
            <Link
              to="/"
              onClick={() => window.scrollTo(0, 0)}
              onClick={() => setMobileMenu(false)}
              className="block font-medium"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => window.scrollTo(0, 0)}
              onClick={() => setMobileMenu(false)}
              className="block font-medium"
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={() => window.scrollTo(0, 0)}
              onClick={() => setMobileMenu(false)}
              className="block font-medium"
            >
              Contact
            </Link>

            <button
              className="flex items-center gap-3"
              onClick={() => setMobileMenu(false)}
            >
              <FaUserCircle className="text-2xl" />
              Profile
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
