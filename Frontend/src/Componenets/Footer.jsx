import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#FAF4ED] to-[#F3E7D7] border-t border-[#E8DCCB] ">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
              ⚖️ WeightScale
            </h2>

            <p className="mt-5 text-gray-600 leading-8">
              Helping businesses and customers find the perfect weighing
              solution with easy online ordering, appointments, consultations,
              and home repair services.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
              <span className="text-green-500 text-lg">✔️</span>
              Trusted by Customers
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
              <span className="text-blue-500 text-lg">🚚</span>
              Fast & Reliable Service
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-5">
              📞 Contact Us
            </h3>

            <div className="space-y-4 text-gray-600">
              <div className="flex items-center gap-3">
                <span className="text-xl">📍</span>
                <span>Gunasvel, Ambika, Gujarat</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xl">📧</span>
                <span>support@weightscale.com</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xl">📱</span>
                <span>+91 99045 87290</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xl">🕒</span>
                <span>Mon - Sat : 9:00 AM - 7:00 PM</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-5">
              🌐 Connect With Me
            </h3>

            <p className="text-gray-600 mb-6">
              Follow us for updates, new products and exciting offers.
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#1877F2] transition-all duration-300 hover:scale-110"
              >
                <FaFacebookF className="text-gray-700 group-hover:text-white text-lg" />
              </a>

              <a
                href="https://www.instagram.com/j_ax28?igsh=YW95OTJpdHd0Zmph"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#E4405F] transition-all duration-300 hover:scale-110"
              >
                <FaInstagram className="text-gray-700 group-hover:text-white text-lg" />
              </a>

              <a
                href="https://www.linkedin.com/in/prajapati-jenish-277ba9284"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#0A66C2] transition-all duration-300 hover:scale-110"
              >
                <FaLinkedinIn className="text-gray-700 group-hover:text-white text-lg" />
              </a>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-white/60 backdrop-blur shadow-sm border border-white">
              <p className="font-semibold text-gray-800">💡 Need Assistance?</p>

              <p className="text-sm text-gray-600 mt-2">
                We're always here to help you choose the right weighing
                solution.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-12 border-t border-[#D9CBB8] pt-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} <b>WeightScale Platform</b> • All
            Rights Reserved.
          </p>

          <p className="text-sm text-gray-700 text-center">
            Made with ❤️, 🎧 & 💻 by
            <a
              className="font-bold text-blue-700 ml-1"
              href="https://www.instagram.com/j_ax28?igsh=YW95OTJpdHd0Zmph"
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
