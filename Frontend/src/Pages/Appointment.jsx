import {
  CheckCircle,
  Clock,
  XCircle,
  User,
  Calendar,
  MapPin,
} from "lucide-react";

const pendingAppointments = [
  {
    id: 1,
    customer: "John Doe",
    product: "MacBook Pro M4",
    date: "20 July 2026",
    time: "11:00 AM",
    address: "Surat, Gujarat",
  },
  {
    id: 2,
    customer: "Emma Watson",
    product: "Gaming Laptop",
    date: "22 July 2026",
    time: "2:30 PM",
    address: "Ahmedabad",
  },
];

const history = [
  {
    id: 1,
    customer: "Robert",
    product: "iPhone 16 Pro",
    date: "10 July 2026",
    status: "Confirmed",
  },
  {
    id: 2,
    customer: "Sophia",
    product: "Dell XPS",
    date: "8 July 2026",
    status: "Ignored",
  },
];

export default function AppointmentRequests() {
  return (
    <div className="min-h-screen bg-[#FAF4ED] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Appointment Requests
          </h1>
          <p className="text-gray-500 mt-2">
            Manage all incoming appointment requests.
          </p>
        </div>

        {/* Pending Requests */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="text-amber-600" size={28} />
            <h2 className="text-2xl font-semibold">Pending Requests</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {pendingAppointments.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#E8DCCB] rounded-3xl shadow-sm hover:shadow-lg transition p-6"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{item.customer}</h3>

                    <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                      Pending
                    </span>
                  </div>

                  <Clock className="text-yellow-500" />
                </div>

                <div className="mt-6 space-y-3 text-gray-600">
                  <div className="flex items-center gap-3">
                    <User size={18} />
                    <span>{item.product}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar size={18} />
                    <span>
                      {item.date} • {item.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin size={18} />
                    <span>{item.address}</span>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition">
                    Confirm
                  </button>

                  <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition">
                    Ignore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Previous Appointments */}

        <div>
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="text-green-600" size={28} />
            <h2 className="text-2xl font-semibold">Previous Requests</h2>
          </div>

          <div className="bg-white rounded-3xl border border-[#E8DCCB] overflow-hidden shadow-sm">
            {history.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-6 border-b last:border-b-0"
              >
                <div>
                  <h3 className="font-semibold text-lg">{item.customer}</h3>

                  <p className="text-gray-500">{item.product}</p>

                  <p className="text-sm text-gray-400 mt-1">{item.date}</p>
                </div>

                <div className="mt-4 md:mt-0">
                  {item.status === "Confirmed" ? (
                    <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
                      <CheckCircle size={18} />
                      Confirmed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full font-medium">
                      <XCircle size={18} />
                      Ignored
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
