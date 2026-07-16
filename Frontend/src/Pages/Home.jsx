import React, { useEffect, useState } from "react";
import { addAppointment, homedata } from "../Api/api";
import ProductCard from "../Componenets/Card";
import Hero from "../assets/Hero.png";
import { useRef } from "react";
import { appointmentSchema } from "../Validator/appointment";
import { motion } from "framer-motion";

const Home = ({ className }) => {
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(9);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(2);
  const [errors, setErrors] = useState({});
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = appointmentSchema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    setErrors({});
    let res = await addAppointment(result);
    console.log(res);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await homedata(page, limit);
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [page]);
  return (
    <main className={`${className} bg-gray-50`}>
      {/* Hero Section */}
      <section
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Hero})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF4ED] via-[#FAF4ED]/90 to-transparent" />

        {/* Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-7xl mx-auto h-screen flex items-center px-6"
        >
          <div className="max-w-xl">
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow-lg mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>

              <span className="text-sm font-semibold text-gray-700">
                Owner : Dharmeshbhai Prajapati
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900"
            >
              Shop Smart,
              <br />
              Schedule Easily
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-8 text-lg leading-8 text-gray-700"
            >
              Premium smart weight scales designed to help you monitor your
              health with precision while allowing easy appointment booking with
              wellness experts.
            </motion.p>

            <motion.div variants={item} className="flex gap-5 mt-10">
              <button
                onClick={scrollToProducts}
                className="bg-[#111827] hover:bg-black text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Shop Now
              </button>

              <button
                onClick={scrollToAppointment}
                className="bg-[#D4B483] hover:bg-[#C59D5F] text-[#111827] px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Book Appointment
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-b from-transparent to-[#FAF4ED]" />
      </section>

      <section className="bg-[#FAF4ED] py-5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="font-bold text-xl">Free Shipping</h3>
              <p className="text-gray-600 mt-3">
                Fast and secure delivery across India.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition">
              <div className="text-5xl mb-4">🛡</div>
              <h3 className="font-bold text-xl">2 Year Warranty</h3>
              <p className="text-gray-600 mt-3">
                Trusted quality with warranty support.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition">
              <div className="text-5xl mb-4">📞</div>
              <h3 className="font-bold text-xl">Expert Support</h3>
              <p className="text-gray-600 mt-3">
                Schedule appointments with professionals.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="font-bold text-xl">Smart Tracking</h3>
              <p className="text-gray-600 mt-3">
                Accurate health monitoring every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="bg-[#FAF4ED] py-10" ref={productRef}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="bg-white px-5 py-2 rounded-full shadow-md font-semibold">
              ⭐ Premium Collection
            </span>

            <h2 className="text-5xl font-bold mt-6 text-gray-900">
              Featured Products
            </h2>

            <p className="mt-5 text-gray-600 max-w-3xl mx-auto text-lg">
              Explore our premium collection of digital weight scales designed
              for accuracy, durability, and smart health tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="bg-[#FAF4ED] pb-12">
        <div className="flex justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
            <button
              disabled={page === 1}
              onClick={() => setpage(page - 1)}
              className="px-6 py-3 rounded-xl border hover:bg-black hover:text-white transition disabled:opacity-40"
            >
              ← Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setpage(index + 1)}
                className={`w-12 h-12 rounded-xl font-bold transition
          ${
            page === index + 1
              ? "bg-black text-white scale-110 shadow-lg"
              : "border hover:bg-[#FAF4ED]"
          }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setpage(page + 1)}
              className="px-6 py-3 rounded-xl border hover:bg-black hover:text-white transition disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF4ED]  pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-[#E8DCCB] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ">
            <div className="grid lg:grid-cols-2 items-center">
              {/* Left Content */}
              <div className="p-12 lg:p-16">
                <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                  Smart Health Starts Here
                </span>

                <h2 className="mt-6 text-5xl font-bold text-gray-900 leading-tight">
                  Track Every Kilogram
                  <br />
                  With Confidence
                </h2>

                <p className="mt-6 text-lg text-gray-600 leading-8">
                  Our smart digital weight scales provide accurate body weight,
                  BMI, body fat, muscle mass, and hydration tracking to help you
                  achieve your fitness goals. Monitor your progress with
                  precision and book consultations with wellness experts
                  whenever you need.
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="flex items-center gap-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">99.9% Accurate</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">BMI Analysis</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">Body Fat Tracking</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">2-Year Warranty</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-10">
                  <button className="bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-900 transition">
                    Shop Smart Scales
                  </button>

                  <button className="border-2 border-black px-8 py-4 rounded-xl font-semibold hover:bg-black hover:text-white transition">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Right Side */}
              <div className="hidden lg:flex justify-center items-center bg-[#F8F3EC] h-full p-10">
                <div className="text-center">
                  <div className="text-7xl mb-6">⚖️</div>

                  <h3 className="text-3xl font-bold text-gray-900">
                    Live Health Tracking
                  </h3>

                  <p className="mt-4 text-gray-600 max-w-sm">
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
      <section className="bg-[#FAF4ED] py-26" ref={appointmentRef}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900">
              Book Appointment
            </h1>

            <p className="mt-4 text-gray-600">
              Choose your appointment type and schedule a convenient time.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-[#E8DCCB] p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Appointment Type */}

              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-5">
                  Select Appointment Type
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                      className={`cursor-pointer rounded-2xl border-2 p-5 transition-all duration-300 ${
                        formData.type === item.value
                          ? "border-[#C59D5F] bg-[#FFF8EE] shadow-lg"
                          : "border-gray-200 bg-white hover:border-[#C59D5F] hover:shadow-md"
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={item.value}
                        checked={formData.type === item.value}
                        onChange={handleChange}
                        className="hidden"
                      />

                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-600 mt-2 leading-6">
                        {item.desc}
                      </p>
                    </label>
                  ))}
                  {errors.type?._errors && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.type._errors[0]}
                    </p>
                  )}
                </div>
              </div>

              {/* Date & Time */}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-2">
                    Appointment Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    min={today}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-5 py-4 focus:border-[#C59D5F] outline-none"
                    required
                  />
                </div>
                {errors.date?._errors && (
                  <span className="text-red-500 text-sm">
                    {errors.date._errors[0]}
                  </span>
                )}

                <div>
                  <div className="relative group">
                    <label className="block font-semibold mb-2 text-gray-800">
                      Preferred Time
                    </label>

                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="
      w-full
      appearance-none
      rounded-xl
      border
      border-gray-300
      bg-white
      px-5
      py-4
      pr-12
      text-gray-700
      transition-all
      duration-300
      cursor-pointer
      shadow-sm
      hover:border-[#C59D5F]
      hover:shadow-md
      focus:outline-none
      focus:ring-4
      focus:ring-[#D4B483]/30
      focus:border-[#C59D5F]
    "
                    >
                      <option value="">Select Time</option>

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
                    <div className="pointer-events-none absolute right-5 top-[58px] -translate-y-1/2 text-gray-500 transition-transform duration-300 group-hover:rotate-180">
                      ▼
                    </div>
                  </div>

                  {errors.time?._errors && (
                    <span className="text-red-500 text-sm">
                      {errors.time._errors[0]}
                    </span>
                  )}
                </div>
              </div>

              {/* Reason */}

              <div>
                <label className="block font-semibold mb-2">
                  Reason / Problem Description
                </label>

                <textarea
                  rows={5}
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Describe your issue..."
                  className="w-full border rounded-xl px-5 py-4 resize-none focus:border-[#C59D5F] outline-none"
                />
                {errors.reason?._errors && (
                  <span className="text-red-500 text-sm">
                    {errors.reason._errors[0]}
                  </span>
                )}
              </div>

              {/* Home Address */}

              {formData.type === "Home Repair" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Service Address</h2>

                  <input
                    type="text"
                    name="address"
                    placeholder="House No, Street"
                    value={formData.address.address}
                    onChange={handleAddressChange}
                    className="w-full border rounded-xl px-5 py-4"
                  />

                  {errors.address?.address?._errors && (
                    <span className="text-red-500 text-sm">
                      {errors.address.address._errors[0]}
                    </span>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.address.city}
                      onChange={handleAddressChange}
                      className="border rounded-xl px-5 py-4"
                    />
                    {errors.address?.city?._errors && (
                      <span className="text-red-500 text-sm">
                        {errors.address.city._errors[0]}
                      </span>
                    )}

                    <input
                      type="text"
                      name="village"
                      placeholder="Village"
                      value={formData.address.village}
                      onChange={handleAddressChange}
                      className="border rounded-xl px-5 py-4"
                    />
                    {errors.address?.village?._errors && (
                      <span className="text-red-500 text-sm">
                        {errors.address.village._errors[0]}
                      </span>
                    )}
                  </div>

                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.address.pincode}
                    onChange={handleAddressChange}
                    className="w-full border rounded-xl px-5 py-4"
                  />
                  {errors.address?.pincode?._errors && (
                    <span className="text-red-500 text-sm">
                      {errors.address.pincode._errors[0]}
                    </span>
                  )}
                </div>
              )}

              {/* Submit */}

              <button
                type="submit"
                className="w-full bg-[#111827] hover:bg-black text-white py-4 rounded-xl font-semibold transition"
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
