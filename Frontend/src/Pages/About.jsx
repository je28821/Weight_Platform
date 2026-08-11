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
    <div className="bg-[#FAF4ED] text-gray-800">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <p className="text-[#C59D5F] font-semibold tracking-widest uppercase">
          About SmartScale
        </p>

        <h1 className="text-5xl md:text-6xl font-extrabold mt-4">
          Precision That
          <span className="text-[#C59D5F]"> Inspires Confidence</span>
        </h1>

        <p className="max-w-3xl mx-auto mt-8 text-lg leading-8 text-gray-600">
          SmartScale is dedicated to helping individuals live healthier lives
          through premium smart weight scales that combine modern design,
          advanced technology, and exceptional accuracy.
        </p>
      </section>

      {/* About */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <img src={about} alt="Weight Scale" className="rounded-3xl shadow-xl" />

        <div>
          <h2 className="text-4xl font-bold mb-6">
            Designed For Better Health
          </h2>

          <p className="text-gray-600 leading-8 mb-6">
            We believe understanding your health begins with accurate data.
            Every SmartScale product is designed to provide precise weight
            measurements while maintaining elegant aesthetics suitable for every
            modern home.
          </p>

          <p className="text-gray-600 leading-8">
            Our mission is to make wellness accessible through intelligent,
            reliable, and beautifully crafted health products.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">Why Choose SmartScale?</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition"
            >
              {item.icon}

              <h3 className="text-xl font-semibold mt-5">{item.title}</h3>

              <p className="text-gray-600 mt-4 leading-7">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Our Mission</h2>

          <p className="text-lg leading-8 text-gray-600">
            To empower every individual with reliable health insights by
            delivering innovative, accurate, and affordable smart weighing
            solutions that inspire healthier lifestyles.
          </p>
        </div>
      </section>

      {/* Terms & Privacy */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10">
        {/* Terms */}

        <div className="bg-white rounded-3xl p-10 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-[#C59D5F]" />
            <h2 className="text-3xl font-bold">Terms & Conditions</h2>
          </div>

          <ul className="space-y-4 text-gray-600 leading-7 list-disc ml-6">
            <li>Use the product only on a flat and stable surface.</li>
            <li>Maximum weight capacity should not be exceeded.</li>
            <li>Orders are confirmed only after successful payment.</li>
            <li>Returns are accepted within 7 days for damaged products.</li>
            <li>Warranty covers manufacturing defects only.</li>
          </ul>
        </div>

        {/* Privacy */}

        <div className="bg-white rounded-3xl p-10 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="text-[#C59D5F]" />
            <h2 className="text-3xl font-bold">Privacy Policy</h2>
          </div>

          <ul className="space-y-4 text-gray-600 leading-7 list-disc ml-6">
            <li>Your personal information is kept secure.</li>
            <li>We never sell customer information.</li>
            <li>Data is used only for orders and appointments.</li>
            <li>Industry-standard security practices are followed.</li>
            <li>Cookies improve website performance and experience.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
