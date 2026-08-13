import { useEffect, useState } from "react";
import { addAppointment, homedata } from "../Api/api";
import ProductCard from "../Componenets/Card";
import Hero from "../assets/Hero.png";
import { useRef } from "react";
import { appointmentSchema } from "../Validator/appointment";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Home = ({ className }) => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [errors, setErrors] = useState({});
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    minPrice: "",
    maxPrice: "",
    sort: "latest",
    page: 1,
    limit: 9,
  });
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);
  const [formData, setFormData] = useState({
    type: "",
    date: "",
    time: "",
    reason: "",
    address: {
      address: "",
      city: "",
      village: "",
      pincode: "",
    },
  });

  const productRef = useRef(null);
  const appointmentRef = useRef(null);
  const today = new Date().toISOString().split("T")[0];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const scrollToProducts = () => {
    productRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToAppointment = () => {
    appointmentRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
    setErrors((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: undefined,
      },
    }));
  };
  const controllerRef = useRef();

  const fetchProducts = async () => {
    try {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      controllerRef.current = new AbortController();
      const params = new URLSearchParams();

      const res = await homedata(
        {
          ...filters,
          search: debouncedSearch,
        },
        controllerRef.current.signal,
      );

      setProducts(res.products);
      setTotalPages(res.totalpages);
    } catch (err) {
      if (err.name !== "CanceledError") {
        console.log(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = appointmentSchema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.format());
      toast.error("Fill The Details Properly !!");
      return;
    }

    setErrors({});
    let res = await addAppointment(result);
    toast.success("Appointment Sent Succesfully !!");
  };

  useEffect(() => {
    fetchProducts();
  }, [
    debouncedSearch,
    filters.category,
    filters.minPrice,
    filters.maxPrice,
    filters.sort,
    filters.page,
    filters.limit,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.search]);

  useEffect(() => {
    const justLoggedIn = localStorage.getItem("justLoggedIn");

    if (justLoggedIn === "true") {
      toast.success("Welcome To Our Platform");
      localStorage.removeItem("justLoggedIn");
    }
  }, []);
  return (
    <main
      className={`${className} bg-[#FAF4ED] w-full overflow-x-hidden font-sans`}
    >
      {/* Hero Section */}
      <section
        className="relative min-h-[100svh] flex items-center overflow-hidden bg-cover bg-[center_top_20%] sm:bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Hero})` }}
      >
        {/* Mobile Overlay: A subtle dark tint instead of a heavy white gradient. 
      Desktop Overlay: Fades left to right naturally. */}
        <div className="absolute inset-0 bg-black/20 sm:bg-gradient-to-r sm:from-[#FAF4ED] sm:via-[#FAF4ED]/80 sm:to-transparent" />

        {/* Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
        >
          {/* 
      Removed the blurry white card wrapper completely. 
      The content now sits directly on the background fully transparent.
    */}
          <div className="max-w-2xl mt-12 sm:mt-0">
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 bg-white/90 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-sm mb-6 sm:mb-8 border border-[#C59D5F]/20"
            >
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs sm:text-sm font-bold tracking-wide text-gray-900 uppercase">
                Owner : Dharmeshbhai Prajapati
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-gray-900 drop-shadow-md sm:drop-shadow-none"
            >
              Shop Smart,
              <br />
              <span className="text-[#000]">Schedule Easily</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-4 sm:mt-8 text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-8 text-gray-100 sm:text-gray-700 max-w-xl font-medium sm:font-normal drop-shadow-md sm:drop-shadow-none"
            >
              Premium smart weight scales designed to help you monitor your
              health with precision while allowing easy appointment booking with
              wellness experts.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-8 sm:mt-10"
            >
              <button
                onClick={scrollToProducts}
                className="w-full sm:w-auto bg-[#111827] hover:bg-black text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold active:scale-[0.98]"
              >
                Shop Now
              </button>

              <button
                onClick={scrollToAppointment}
                className="w-full sm:w-auto bg-[#C59D5F] hover:bg-[#b88c4d] text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold active:scale-[0.98]"
              >
                Book Appointment
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Fade (Blends section into the next) */}
        <div className="absolute bottom-0 left-0 w-full h-24 sm:h-36 bg-gradient-to-b from-transparent to-[#FAF4ED]" />
      </section>

      {/* Features Section */}
      <section className="bg-[#FAF4ED] py-8 sm:py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: "🚚",
                title: "Free Shipping",
                desc: "Fast and secure delivery across India.",
              },
              {
                icon: "🛡",
                title: "2 Year Warranty",
                desc: "Trusted quality with warranty support.",
              },
              {
                icon: "📞",
                title: "Expert Support",
                desc: "Schedule appointments with professionals.",
              },
              {
                icon: "⚡",
                title: "Smart Tracking",
                desc: "Accurate health monitoring every day.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
              >
                <div className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg sm:text-xl text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-[#FAF4ED] py-12 lg:py-20" ref={productRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10 lg:mb-16">
            <span className="inline-block bg-white px-4 py-2 rounded-full shadow-sm border border-[#C59D5F]/30 text-xs sm:text-sm font-bold text-[#C59D5F] uppercase tracking-widest mb-4">
              ⭐ Premium Collection
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              Featured Products
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-2">
              Explore our premium collection of digital weight scales designed
              for accuracy, durability, and smart health tracking.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#C59D5F]/20 p-4 sm:p-5 mb-8 sm:mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-center">
              {/* Search */}
              <div className="w-full sm:col-span-2 lg:col-span-4 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      search: e.target.value,
                      page: 1,
                    }))
                  }
                  className="w-full pl-11 pr-4 py-3.5 sm:py-3 text-sm sm:text-base rounded-xl border border-gray-200 focus:border-[#C59D5F] focus:ring-2 focus:ring-[#C59D5F]/20 outline-none transition-all bg-gray-50/50 focus:bg-white"
                />
              </div>

              {/* Category */}
              <div className="w-full sm:col-span-1 lg:col-span-2 relative">
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      category: e.target.value,
                      page: 1,
                    }))
                  }
                  className="w-full px-4 py-3.5 sm:py-3 text-sm sm:text-base rounded-xl border border-gray-200 focus:border-[#C59D5F] focus:ring-2 focus:ring-[#C59D5F]/20 outline-none transition-all bg-white appearance-none cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="Personal Scale">Personal Scale</option>
                  <option value="Kitchen Scale">Kitchen Scale</option>
                  <option value="Parcel Scale">Parcel Scale</option>
                  <option value="Industrial Scale">Industrial Scale</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                  ▼
                </div>
              </div>

              {/* Price */}
              <div className="w-full sm:col-span-1 lg:col-span-2 relative">
                <select
                  onChange={(e) => {
                    const value = e.target.value;
                    let min = "";
                    let max = "";

                    if (value === "0-1000") {
                      min = 0;
                      max = 1000;
                    }
                    if (value === "1000-3000") {
                      min = 1000;
                      max = 3000;
                    }
                    if (value === "3000-5000") {
                      min = 3000;
                      max = 5000;
                    }
                    if (value === "5000+") {
                      min = 5000;
                    }

                    setFilters((prev) => ({
                      ...prev,
                      minPrice: min,
                      maxPrice: max,
                      page: 1,
                    }));
                  }}
                  className="w-full px-4 py-3.5 sm:py-3 text-sm sm:text-base rounded-xl border border-gray-200 focus:border-[#C59D5F] focus:ring-2 focus:ring-[#C59D5F]/20 outline-none transition-all bg-white appearance-none cursor-pointer"
                >
                  <option value="All">All Prices</option>
                  <option value="0-1000">₹0 - ₹1,000</option>
                  <option value="1000-3000">₹1,001 - ₹3,000</option>
                  <option value="3000-5000">₹3,001 - ₹5,000</option>
                  <option value="5000+">₹5,000+</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                  ▼
                </div>
              </div>

              {/* Sort */}
              <div className="w-full sm:col-span-1 lg:col-span-2 relative">
                <select
                  value={filters.sort}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sort: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3.5 sm:py-3 text-sm sm:text-base rounded-xl border border-gray-200 focus:border-[#C59D5F] focus:ring-2 focus:ring-[#C59D5F]/20 outline-none transition-all bg-white appearance-none cursor-pointer"
                >
                  <option value="">Sort By</option>
                  <option value="low">Price: Low → High</option>
                  <option value="high">Price: High → Low</option>
                  <option value="name">Name: A → Z</option>
                  <option value="latest">Latest</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                  ▼
                </div>
              </div>

              {/* Reset Button */}
              <div className="w-full sm:col-span-1 lg:col-span-2">
                <button
                  onClick={() => {
                    setFilters({
                      search: "",
                      category: "All",
                      minPrice: "",
                      maxPrice: "",
                      sort: "latest",
                      page: 1,
                      limit: 9,
                    });
                  }}
                  className="w-full px-4 py-3.5 sm:py-3 rounded-xl bg-[#111827] hover:bg-black text-white text-sm sm:text-base font-semibold transition-all duration-300 active:scale-[0.98]"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-12 sm:py-16 text-center">
                <div className="bg-white rounded-3xl shadow-sm border border-[#C59D5F]/20 p-8 sm:p-12 max-w-md mx-auto transition-all">
                  <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">📦</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    No Products Found
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 mb-8">
                    We couldn't find any products matching your current filters.
                    Try adjusting your search criteria.
                  </p>
                  <button
                    onClick={() => {
                      setFilters({
                        search: "",
                        category: "All",
                        minPrice: "",
                        maxPrice: "",
                        sort: "latest",
                        page: 1,
                        limit: 9,
                      });
                    }}
                    className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-xl bg-[#C59D5F] hover:bg-[#b88c4d] text-white font-semibold transition-all active:scale-[0.98]"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="bg-[#FAF4ED] pb-12">
        <div className="flex justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
            <button
              disabled={filters.page === 1}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  page: prev.page - 1,
                }))
              }
              className="px-6 py-3 rounded-xl border hover:bg-black hover:text-white transition disabled:opacity-40"
            >
              ← Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    page: index + 1,
                  }))
                }
                className={`w-12 h-12 rounded-xl font-bold transition ${
                  filters.page === index + 1
                    ? "bg-black text-white scale-110 shadow-lg"
                    : "border hover:bg-[#FAF4ED]"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={filters.page === totalPages}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  page: prev.page + 1,
                }))
              }
              className="px-6 py-3 rounded-xl border hover:bg-black hover:text-white transition disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </div>
      </section>

      {/* Feature Banner Section */}
      <section className="bg-[#FAF4ED] pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#C59D5F]/20 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
            <div className="grid lg:grid-cols-2 items-center">
              {/* Left Content */}
              <div className="p-8 sm:p-12 lg:p-16">
                <span className="inline-block bg-[#FAF4ED] text-[#C59D5F] border border-[#C59D5F]/30 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide uppercase">
                  Smart Health Starts Here
                </span>

                <h2 className="mt-5 sm:mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.15] tracking-tight">
                  Track Every Kilogram
                  <br className="hidden sm:block" />
                  <span className="text-[#C59D5F]"> With Confidence</span>
                </h2>

                <p className="mt-5 sm:mt-6 text-base sm:text-lg text-gray-600 leading-relaxed sm:leading-8">
                  Our smart digital weight scales provide accurate body weight,
                  BMI, body fat, muscle mass, and hydration tracking to help you
                  achieve your fitness goals. Monitor your progress with
                  precision and book consultations with wellness experts
                  whenever you need.
                </p>

                {/* Features List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 sm:mt-10">
                  {[
                    "99.9% Accurate",
                    "BMI Analysis",
                    "Body Fat Tracking",
                    "2-Year Warranty",
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#C59D5F]/20 text-[#C59D5F] text-xs font-bold">
                        ✓
                      </div>
                      <span className="text-gray-700 font-medium text-sm sm:text-base">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-10 sm:mt-12">
                  <button className="w-full sm:w-auto bg-[#111827] text-white px-8 py-4 rounded-xl font-semibold hover:bg-black transition-all active:scale-[0.98] shadow-md">
                    Shop Smart Scales
                  </button>
                  <button className="w-full sm:w-auto border-2 border-[#111827] text-[#111827] px-8 py-4 rounded-xl font-semibold hover:bg-[#111827] hover:text-white transition-all active:scale-[0.98]">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Right Side Image/Graphic */}
              <div className="hidden lg:flex justify-center items-center bg-[#FAF4ED]/50 h-full p-12 border-l border-[#C59D5F]/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C59D5F]/5 to-transparent"></div>
                <div className="text-center relative z-10">
                  <div
                    className="text-8xl mb-8 drop-shadow-xl animate-bounce"
                    style={{ animationDuration: "3s" }}
                  >
                    ⚖️
                  </div>
                  <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Live Health Tracking
                  </h3>
                  <p className="mt-4 text-gray-600 max-w-sm mx-auto text-lg leading-relaxed">
                    Measure your weight, monitor your health, and stay motivated
                    with advanced digital technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section
        className="bg-[#FAF4ED] pb-20 sm:pb-24 pt-8"
        ref={appointmentRef}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Book Appointment
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto">
              Choose your appointment type and schedule a convenient time with
              our expert team.
            </p>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-[#C59D5F]/20 p-6 sm:p-10 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
              {/* Appointment Type */}
              <div>
                <label className="block text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">
                  1. Select Service Type
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {[
                    {
                      value: "Home Repair",
                      title: "🏠 Home Repair",
                      desc: "Technician visits your home to repair your weight scale.",
                    },
                    {
                      value: "Service Center",
                      title: "🏢 Service Center",
                      desc: "Bring your weight scale to our nearest service center.",
                    },
                    {
                      value: "Consultation",
                      title: "💬 Consultation",
                      desc: "Get expert advice before purchasing or servicing.",
                    },
                    {
                      value: "Product Demo",
                      title: "📦 Product Demo",
                      desc: "Schedule a live demonstration of our products.",
                    },
                  ].map((item) => (
                    <label
                      key={item.value}
                      className={`cursor-pointer rounded-2xl border-2 p-5 sm:p-6 transition-all duration-300 relative overflow-hidden ${
                        formData.type === item.value
                          ? "border-[#C59D5F] bg-[#FAF4ED] shadow-md"
                          : "border-gray-100 bg-white hover:border-[#C59D5F]/50 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={item.value}
                        checked={formData.type === item.value}
                        onChange={handleChange}
                        className="sr-only"
                        aria-label={item.title}
                      />

                      {formData.type === item.value && (
                        <div className="absolute top-4 right-4 text-[#C59D5F]">
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      )}

                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 pr-8">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </label>
                  ))}
                </div>
                {errors.type?._errors && (
                  <p className="mt-3 text-sm font-medium text-red-500 animate-pulse">
                    * {errors.type._errors[0]}
                  </p>
                )}
              </div>

              <hr className="border-gray-100" />

              {/* Date & Time */}
              <div>
                <label className="block text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">
                  2. Choose Date & Time
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Appointment Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      min={today}
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-5 py-3.5 sm:py-4 text-sm sm:text-base outline-none transition-all duration-300 focus:bg-white focus:border-[#C59D5F] focus:ring-2 focus:ring-[#C59D5F]/20 cursor-pointer"
                      required
                    />
                    {errors.date?._errors && (
                      <span className="block mt-2 text-red-500 text-sm font-medium">
                        * {errors.date._errors[0]}
                      </span>
                    )}
                  </div>

                  <div className="relative group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Time
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-5 py-3.5 sm:py-4 pr-12 text-sm sm:text-base outline-none transition-all duration-300 focus:bg-white focus:border-[#C59D5F] focus:ring-2 focus:ring-[#C59D5F]/20 cursor-pointer appearance-none"
                    >
                      <option value="" disabled hidden>
                        Select a time
                      </option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                    </select>

                    {/* Custom Arrow */}
                    <div className="pointer-events-none absolute right-5 top-[42px] sm:top-[46px] text-gray-400 transition-transform duration-300 group-hover:text-[#C59D5F] text-xs">
                      ▼
                    </div>

                    {errors.time?._errors && (
                      <span className="block mt-2 text-red-500 text-sm font-medium">
                        * {errors.time._errors[0]}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Reason */}
              <div>
                <label className="block text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">
                  3. Reason / Problem Description
                </label>
                <textarea
                  rows={4}
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Please describe your issue or reason for the appointment in detail..."
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-5 py-4 text-sm sm:text-base outline-none transition-all duration-300 focus:bg-white focus:border-[#C59D5F] focus:ring-2 focus:ring-[#C59D5F]/20 resize-y min-h-[120px]"
                />
                {errors.reason?._errors && (
                  <span className="block mt-2 text-red-500 text-sm font-medium">
                    * {errors.reason._errors[0]}
                  </span>
                )}
              </div>

              {/* Conditional Home Address */}
              {formData.type === "Home Repair" && (
                <div className="space-y-5 sm:space-y-6 bg-gray-50 p-5 sm:p-8 rounded-2xl border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    Service Address
                  </h2>

                  <div>
                    <input
                      type="text"
                      name="address"
                      placeholder="House No, Street, Landmark"
                      value={formData.address.address}
                      onChange={handleAddressChange}
                      className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 sm:py-4 text-sm sm:text-base focus:border-[#C59D5F] focus:ring-2 focus:ring-[#C59D5F]/20 outline-none transition-all"
                    />
                    {errors.address?.address?._errors && (
                      <span className="block mt-2 text-red-500 text-sm font-medium">
                        * {errors.address.address._errors[0]}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.address.city}
                        onChange={handleAddressChange}
                        className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 sm:py-4 text-sm sm:text-base focus:border-[#C59D5F] focus:ring-2 focus:ring-[#C59D5F]/20 outline-none transition-all"
                      />
                      {errors.address?.city?._errors && (
                        <span className="block mt-2 text-red-500 text-sm font-medium">
                          * {errors.address.city._errors[0]}
                        </span>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        name="village"
                        placeholder="Village / Area"
                        value={formData.address.village}
                        onChange={handleAddressChange}
                        className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 sm:py-4 text-sm sm:text-base focus:border-[#C59D5F] focus:ring-2 focus:ring-[#C59D5F]/20 outline-none transition-all"
                      />
                      {errors.address?.village?._errors && (
                        <span className="block mt-2 text-red-500 text-sm font-medium">
                          * {errors.address.village._errors[0]}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="6-digit Pincode"
                      value={formData.address.pincode}
                      onChange={handleAddressChange}
                      maxLength={6}
                      className="w-full sm:w-1/2 bg-white border border-gray-200 rounded-xl px-5 py-3.5 sm:py-4 text-sm sm:text-base focus:border-[#C59D5F] focus:ring-2 focus:ring-[#C59D5F]/20 outline-none transition-all"
                    />
                    {errors.address?.pincode?._errors && (
                      <span className="block mt-2 text-red-500 text-sm font-medium">
                        * {errors.address.pincode._errors[0]}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#111827] hover:bg-black text-white py-4 sm:py-5 rounded-xl text-base sm:text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] mt-4"
              >
                Confirm Appointment
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
