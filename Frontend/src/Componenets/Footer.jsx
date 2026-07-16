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
          {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
            (Icon, index) => (
              <a
                key={index}
                href="#"
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-[#3D3D3D] hover:text-white hover:border-[#3D3D3D] transition"
              >
                <Icon size={15} />
              </a>
            ),
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
