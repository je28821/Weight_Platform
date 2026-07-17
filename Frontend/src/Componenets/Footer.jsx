import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#FAF4ED] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & Copyright */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-[#3D3D3D]">E-Shop</h2>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-3">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition"
          >
            <FaFacebookF size={15} />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/j_ax28?igsh=YW95OTJpdHd0Zmph"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F] transition"
          >
            <FaInstagram size={15} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/prajapati-jenish-277ba9284?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition"
          >
            <FaLinkedinIn size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
