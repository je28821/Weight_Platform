import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#FAF4ED] border-t border-[#C59D5F]/20 relative overflow-hidden font-sans w-full">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-24 bg-[#C59D5F]/5 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* 1. Brand Section */}
          <div className="lg:col-span-5 flex flex-col">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-3 tracking-tight">
              <span className="text-3xl sm:text-4xl drop-shadow-sm">⚖️</span>
              WeightScale
            </h2>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-600 leading-relaxed sm:leading-8 max-w-md">
              Helping businesses and customers find the perfect weighing
              solution with easy online ordering, appointments, consultations,
              and home repair services.
            </p>

            <div className="mt-6 sm:mt-8 space-y-3">
              <div className="flex items-center gap-3 text-sm sm:text-base text-gray-700 font-medium">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#C59D5F]/20 text-[#C59D5F] text-xs">
                  ✓
                </div>
                Trusted by Customers
              </div>

              <div className="flex items-center gap-3 text-sm sm:text-base text-gray-700 font-medium">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#C59D5F]/20 text-[#C59D5F] text-xs">
                  ✓
                </div>
                Fast & Reliable Service
              </div>
            </div>
          </div>

          {/* 2. Contact Section */}
          <div className="lg:col-span-3 flex flex-col">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-5 sm:mb-6 tracking-tight">
              Contact Us
            </h3>

            <div className="space-y-4 sm:space-y-5 text-sm sm:text-base text-gray-600">
              <div className="flex items-start gap-3.5 group">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-[#C59D5F]/20 shadow-sm text-base group-hover:border-[#C59D5F] transition-colors">
                  📍
                </span>
                <span className="pt-1 leading-relaxed">
                  Gunasvel, Ambika, Gujarat
                </span>
              </div>

              <div className="flex items-center gap-3.5 group">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-[#C59D5F]/20 shadow-sm text-base group-hover:border-[#C59D5F] transition-colors">
                  📧
                </span>
                <a
                  href="mailto:support@weightscale.com"
                  className="hover:text-[#C59D5F] transition-colors truncate"
                >
                  support@weightscale.com
                </a>
              </div>

              <div className="flex items-center gap-3.5 group">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-[#C59D5F]/20 shadow-sm text-base group-hover:border-[#C59D5F] transition-colors">
                  📱
                </span>
                <a
                  href="tel:+919904587290"
                  className="hover:text-[#C59D5F] transition-colors"
                >
                  +91 99045 87290
                </a>
              </div>

              <div className="flex items-start gap-3.5 group">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-[#C59D5F]/20 shadow-sm text-base group-hover:border-[#C59D5F] transition-colors">
                  🕒
                </span>
                <span className="pt-1 leading-relaxed">
                  Mon - Sat <br className="sm:hidden" /> 9:00 AM - 7:00 PM
                </span>
              </div>
            </div>
          </div>

          {/* 3. Social & Assistance Section */}
          <div className="lg:col-span-4 flex flex-col">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-5 tracking-tight">
              Connect With Us
            </h3>

            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Follow us for updates, new products, and exciting offers.
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <FaFacebookF className="text-gray-600 group-hover:text-white text-base sm:text-lg transition-colors" />
              </a>

              <a
                href="https://www.instagram.com/j_ax28?igsh=YW95OTJpdHd0Zmph"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center hover:bg-[#E4405F] hover:border-[#E4405F] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <FaInstagram className="text-gray-600 group-hover:text-white text-base sm:text-lg transition-colors" />
              </a>

              <a
                href="https://www.linkedin.com/in/prajapati-jenish-277ba9284"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <FaLinkedinIn className="text-gray-600 group-hover:text-white text-base sm:text-lg transition-colors" />
              </a>
            </div>

            {/* Assistance Box */}
            <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-white/60 backdrop-blur-md shadow-sm border border-[#C59D5F]/20 hover:border-[#C59D5F]/40 transition-colors duration-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">💡</span>
                <p className="font-bold text-gray-900 tracking-tight">
                  Need Assistance?
                </p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                We're always here to help you choose the right weighing solution
                for your specific needs.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom / Copyright Bar */}
        <div className="mt-12 sm:mt-16 border-t border-[#C59D5F]/20 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <p className="text-xs sm:text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-gray-900">
              WeightScale Platform
            </span>{" "}
            • All Rights Reserved.
          </p>

          <p className="text-xs sm:text-sm text-gray-500 text-center flex flex-wrap justify-center items-center gap-1">
            Made with <span className="text-red-500 mx-0.5">❤️</span>, 🎧 & 💻
            by
            <a
              className="font-bold text-gray-900 hover:text-[#C59D5F] ml-1 transition-colors underline decoration-[#C59D5F]/30 decoration-2 underline-offset-4 hover:decoration-[#C59D5F]"
              href="https://www.instagram.com/j_ax28?igsh=YW95OTJpdHd0Zmph"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jenish Prajapati
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
