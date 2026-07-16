import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-[#FAF4ED] min-h-screen">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
        <p className="text-[#C59D5F] uppercase tracking-widest font-semibold">
          Contact Us
        </p>

        <h1 className="text-5xl font-bold mt-4 text-gray-900">
          We'd Love to Hear From You
        </h1>

        <p className="max-w-2xl mx-auto mt-6 text-gray-600 text-lg">
          Have questions about our smart weight scales or need help with your
          appointment? Our team is always here to assist you.
        </p>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-6 pb-20 grid lg:grid-cols-2 gap-12">
        {/* Left Side */}
        <div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <Phone className="text-[#C59D5F]" size={35} />

              <h3 className="font-semibold text-xl mt-4">Phone</h3>

              <p className="text-gray-600 mt-2">+91 99045 87290</p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <Mail className="text-[#C59D5F]" size={35} />

              <h3 className="font-semibold text-xl mt-4">Email</h3>

              <p className="text-gray-600 mt-2">
                prajaptidharmesh3171@gmail.com
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <MapPin className="text-[#C59D5F]" size={35} />

              <h3 className="font-semibold text-xl mt-4">Address</h3>

              <p className="text-gray-600 mt-2">
                198, Gunasvel, Ambika, surat, Gujarat, India
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <Clock className="text-[#C59D5F]" size={35} />

              <h3 className="font-semibold text-xl mt-4">Working Hours</h3>

              <p className="text-gray-600 mt-2">
                Mon - Sun
                <br />
                5: 00 PM - 9:00 PM
              </p>
            </div>
          </div>

          {/* Google Map Placeholder */}

          <div className="mt-8 bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="h-72 bg-gray-200 flex items-center justify-center">
              <iframe
                title="Company Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5270.051848213485!2d73.18102085413064!3d20.93285272625357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0895f3622ed81%3A0x3cf9ce60d7dfc0e6!2sBank%20of%20Baroda%20ATM!5e0!3m2!1sen!2sin!4v1784183364523!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="bg-white rounded-3xl shadow-lg p-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Send Us a Message
          </h2>

          <p className="text-gray-600 mt-3 mb-8">
            Fill out the form below and our team will get back to you shortly.
          </p>

          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#C59D5F]"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#C59D5F]"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#C59D5F]"
            />

            <textarea
              rows="6"
              placeholder="Write your message..."
              className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#C59D5F] resize-none"
            />

            <button className="w-full bg-[#111827] hover:bg-black text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition">
              <Send size={20} />
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
