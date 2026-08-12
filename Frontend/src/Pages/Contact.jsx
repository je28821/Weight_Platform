import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-[#FAF4ED] min-h-screen w-full overflow-x-hidden font-sans">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 text-center">
        <p className="text-[#C59D5F] text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-4">
          Contact Us
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
          We'd Love to Hear From You
        </h1>

        <p className="max-w-2xl mx-auto mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed px-2 sm:px-0">
          Have questions about our smart weight scales or need help with your
          appointment? Our team is always here to assist you.
        </p>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-start">
        {/* Left Side (Info & Map) */}
        <div className="flex flex-col w-full">
          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Phone Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col items-start">
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-[#FAF4ED] text-[#C59D5F] mb-3 sm:mb-4">
                <Phone className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="font-semibold text-lg sm:text-xl text-gray-900">
                Phone
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-2">
                +91 99045 87290
              </p>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col items-start">
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-[#FAF4ED] text-[#C59D5F] mb-3 sm:mb-4">
                <Mail className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="font-semibold text-lg sm:text-xl text-gray-900">
                Email
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-2 break-all sm:break-words w-full">
                prajaptidharmesh3171@gmail.com
              </p>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col items-start">
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-[#FAF4ED] text-[#C59D5F] mb-3 sm:mb-4">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="font-semibold text-lg sm:text-xl text-gray-900">
                Address
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-2 leading-relaxed">
                198, Gunasvel, Ambika, surat, Gujarat, India
              </p>
            </div>

            {/* Working Hours Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col items-start">
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-[#FAF4ED] text-[#C59D5F] mb-3 sm:mb-4">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="font-semibold text-lg sm:text-xl text-gray-900">
                Working Hours
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-2 leading-relaxed">
                Mon - Sun <br />
                <span className="font-medium text-gray-800">
                  5:00 PM - 9:00 PM
                </span>
              </p>
            </div>
          </div>

          {/* Google Map Placeholder */}
          <div className="mt-6 sm:mt-8 bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative h-64 sm:h-72 lg:h-80 w-full group">
            <div className="absolute inset-0 bg-gray-100 animate-pulse -z-10"></div>
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5270.051848213485!2d73.18102085413064!3d20.93285272625357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0895f3622ed81%3A0x3cf9ce60d7dfc0e6!2sBank%20of%20Baroda%20ATM!5e0!3m2!1sen!2sin!4v1784183364523!5m2!1sen!2sin"
              className="w-full h-full border-0 transition-opacity duration-300 group-hover:opacity-90"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8 lg:p-10 w-full h-full flex flex-col">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Send Us a Message
          </h2>

          <p className="text-sm sm:text-base text-gray-600 mt-2 sm:mt-3 mb-6 sm:mb-8 leading-relaxed">
            Fill out the form below and our team will get back to you shortly.
          </p>

          <form
            className="space-y-4 sm:space-y-5 flex-1 flex flex-col"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative">
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                aria-label="Your Name"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base outline-none transition-all duration-300 focus:bg-white focus:border-[#C59D5F] focus:ring-2 focus:ring-[#C59D5F]/20"
              />
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                aria-label="Email Address"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base outline-none transition-all duration-300 focus:bg-white focus:border-[#C59D5F] focus:ring-2 focus:ring-[#C59D5F]/20"
              />
            </div>

            <div className="relative">
              <input
                type="tel"
                id="phone"
                placeholder="Phone Number"
                aria-label="Phone Number"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base outline-none transition-all duration-300 focus:bg-white focus:border-[#C59D5F] focus:ring-2 focus:ring-[#C59D5F]/20"
              />
            </div>

            <div className="relative flex-1">
              <textarea
                id="message"
                placeholder="Write your message..."
                aria-label="Write your message"
                className="w-full h-32 sm:h-40 lg:h-full min-h-[120px] bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base outline-none transition-all duration-300 focus:bg-white focus:border-[#C59D5F] focus:ring-2 focus:ring-[#C59D5F]/20 resize-y sm:resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-auto w-full bg-gray-900 hover:bg-black text-white py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 active:scale-[0.98] group"
            >
              <Send className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
