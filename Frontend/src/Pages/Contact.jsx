import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-[#FAF4ED] min-h-screen w-full overflow-x-hidden font-sans selection:bg-[#C59D5F] selection:text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 text-center">
        <div className="inline-block mb-3 sm:mb-4 px-4 py-1.5 rounded-full bg-[#C59D5F]/10 border border-[#C59D5F]/20">
          <p className="text-[#C59D5F] text-xs sm:text-sm font-semibold tracking-widest uppercase">
            Contact Us
          </p>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
          We'd Love to Hear From You
        </h1>

        <p className="max-w-2xl mx-auto mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed px-2 sm:px-0">
          Have questions about our smart weight scales or need help with your
          appointment? Our team is always here to assist you.
        </p>
      </section>

      {/* Main Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 flex flex-col gap-10 lg:gap-14">
        {/* ================= INFO CARDS (Top Row) ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Phone Card */}
          <div className="group bg-white rounded-2xl sm:rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#C59D5F]/5 flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-[#FAF4ED] text-[#C59D5F] mb-5 transition-transform duration-300 group-hover:scale-110">
              <Phone className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h3 className="font-semibold text-lg sm:text-xl text-gray-900">
              Phone
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mt-2 font-medium">
              +91 99045 87290
            </p>
          </div>

          {/* Email Card */}
          <div className="group bg-white rounded-2xl sm:rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#C59D5F]/5 flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-[#FAF4ED] text-[#C59D5F] mb-5 transition-transform duration-300 group-hover:scale-110">
              <Mail className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h3 className="font-semibold text-lg sm:text-xl text-gray-900">
              Email
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mt-2 font-medium break-words w-full">
              prajaptidharmesh3171@gmail.com
            </p>
          </div>

          {/* Address Card */}
          <div className="group bg-white rounded-2xl sm:rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#C59D5F]/5 flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-[#FAF4ED] text-[#C59D5F] mb-5 transition-transform duration-300 group-hover:scale-110">
              <MapPin className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h3 className="font-semibold text-lg sm:text-xl text-gray-900">
              Address
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mt-2 font-medium leading-relaxed">
              198, Gunasvel, Ambika,
              <br /> Surat, Gujarat
            </p>
          </div>

          {/* Working Hours Card */}
          <div className="group bg-white rounded-2xl sm:rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#C59D5F]/5 flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-[#FAF4ED] text-[#C59D5F] mb-5 transition-transform duration-300 group-hover:scale-110">
              <Clock className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h3 className="font-semibold text-lg sm:text-xl text-gray-900">
              Hours
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mt-2 leading-relaxed">
              Mon - Sun <br />
              <span className="font-medium text-[#C59D5F]">
                5:00 PM - 9:00 PM
              </span>
            </p>
          </div>
        </div>

        {/* ================= GOOGLE MAP (Bottom Wide) ================= */}
        <div className="bg-white p-2 sm:p-3 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 w-full group relative h-72 sm:h-96 lg:h-[450px]">
          <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-2xl sm:rounded-3xl -z-10"></div>
          <iframe
            title="Company Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5270.051848213485!2d73.18102085413064!3d20.93285272625357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0895f3622ed81%3A0x3cf9ce60d7dfc0e6!2sBank%20of%20Baroda%20ATM!5e0!3m2!1sen!2sin!4v1784183364523!5m2!1sen!2sin"
            className="w-full h-full border-0 rounded-xl sm:rounded-2xl transition-opacity duration-300 group-hover:opacity-95 filter contrast-[0.95]"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;
