import {
  ShieldCheck,
  HeartPulse,
  Truck,
  Scale,
  FileText,
  Lock,
} from "lucide-react";
import about from "../assets/about.png";

const features = [
  {
    icon: <Scale size={36} className="text-[#C59D5F]" />,
    title: "High Accuracy",
    description:
      "Advanced sensor technology delivers precise and consistent weight measurements.",
  },
  {
    icon: <HeartPulse size={36} className="text-[#C59D5F]" />,
    title: "Health Monitoring",
    description:
      "Track your fitness journey and monitor your body weight with confidence.",
  },
  {
    icon: <Truck size={36} className="text-[#C59D5F]" />,
    title: "Fast Delivery",
    description:
      "Secure packaging and quick shipping to ensure your product arrives safely.",
  },
  {
    icon: <ShieldCheck size={36} className="text-[#C59D5F]" />,
    title: "Premium Quality",
    description:
      "Built using durable tempered glass and premium materials for long-lasting performance.",
  },
];

export default function About() {
  return (
    <div className="bg-[#FAF4ED] text-gray-800 w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
        <p className="text-[#C59D5F] text-xs sm:text-sm font-semibold tracking-widest uppercase">
          About SmartScale
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mt-4 tracking-tight leading-tight">
          Precision That
          <span className="text-[#C59D5F] block sm:inline">
            {" "}
            Inspires Confidence
          </span>
        </h1>

        <p className="max-w-3xl mx-auto mt-6 sm:mt-8 text-base sm:text-lg leading-relaxed sm:leading-8 text-gray-600 px-2 sm:px-0">
          SmartScale is dedicated to helping individuals live healthier lives
          through premium smart weight scales that combine modern design,
          advanced technology, and exceptional accuracy.
        </p>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="w-full">
          <img
            src={about}
            alt="Smart Weight Scale"
            className="w-full h-auto object-cover rounded-2xl sm:rounded-3xl shadow-xl"
          />
        </div>

        <div className="text-left mt-4 md:mt-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Designed For Better Health
          </h2>

          <p className="text-gray-600 text-sm sm:text-base leading-7 sm:leading-8 mb-4 sm:mb-6">
            We believe understanding your health begins with accurate data.
            Every SmartScale product is designed to provide precise weight
            measurements while maintaining elegant aesthetics suitable for every
            modern home.
          </p>

          <p className="text-gray-600 text-sm sm:text-base leading-7 sm:leading-8">
            Our mission is to make wellness accessible through intelligent,
            reliable, and beautifully crafted health products.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Why Choose SmartScale?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="inline-block p-3 rounded-2xl bg-[#FAF4ED] text-[#C59D5F] mb-4">
                  {item.icon}
                </div>

                <h3 className="text-lg sm:text-xl font-semibold mt-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm sm:text-base mt-3 sm:mt-4 leading-6 sm:leading-7">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-16 sm:py-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
            Our Mission
          </h2>

          <p className="text-base sm:text-lg leading-relaxed sm:leading-8 text-gray-600 max-w-3xl mx-auto">
            To empower every individual with reliable health insights by
            delivering innovative, accurate, and affordable smart weighing
            solutions that inspire healthier lifestyles.
          </p>
        </div>
      </section>

      {/* Terms & Privacy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {/* Terms */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <FileText className="text-[#C59D5F] w-6 h-6 sm:w-7 sm:h-7 shrink-0" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                Terms & Conditions
              </h2>
            </div>

            <ul className="space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base leading-6 sm:leading-7 list-disc pl-5">
              <li>Use the product only on a flat and stable surface.</li>
              <li>Maximum weight capacity should not be exceeded.</li>
              <li>Orders are confirmed only after successful payment.</li>
              <li>Returns are accepted within 7 days for damaged products.</li>
              <li>Warranty covers manufacturing defects only.</li>
            </ul>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Lock className="text-[#C59D5F] w-6 h-6 sm:w-7 sm:h-7 shrink-0" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                Privacy Policy
              </h2>
            </div>

            <ul className="space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base leading-6 sm:leading-7 list-disc pl-5">
              <li>Your personal information is kept secure.</li>
              <li>We never sell customer information.</li>
              <li>Data is used only for orders and appointments.</li>
              <li>Industry-standard security practices are followed.</li>
              <li>Cookies improve website performance and experience.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
