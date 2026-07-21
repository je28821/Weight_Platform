import {
  CheckCircle,
  Clock,
  XCircle,
  User,
  Calendar,
  MapPin,
  Wrench,
  ClipboardList,
} from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { adminappontments, handleConfirmss, handleIgnors } from "../Api/api";

export default function AppointmentRequests() {
  const [appointments, setAppointments] = useState([]);

  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    Confirmed: "bg-blue-100 text-blue-700 border border-blue-200",
    Completed: "bg-green-100 text-green-700 border border-green-200",
    Cancelled: "bg-red-100 text-red-700 border border-red-200",
  };

  const pendingAppointments = appointments.filter(
    (item) => item.status === "Pending",
  );

  const completedAppointments = appointments.filter(
    (item) =>
      item.status === "Confirmed" ||
      item.status === "Cancelled" ||
      item.status === " Completed",
  );

  const handleConfirm = async (id) => {
    try {
      const res = await handleConfirmss(id);

      if (res.success) {
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment._id === id
              ? { ...appointment, status: "Confirmed" }
              : appointment,
          ),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleIgnore = async (id) => {
    try {
      const res = await handleIgnors(id);

      if (res.success) {
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment._id === id
              ? { ...appointment, status: "Cancelled" }
              : appointment,
          ),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await adminappontments();
        setAppointments(res.appointments);
      } catch (error) {
        console.error("API Error:", error);
      }
    }

    fetchAppointments();
  }, []);
  return (
    <div className="min-h-screen bg-[#FAF4ED] py-10 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Appointment Management
          </h1>
          <p className="text-gray-500 mt-2">
            Manage pending requests and review completed appointments.
          </p>
        </div>

        {/* ================= Pending ================= */}

        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="text-yellow-600" size={30} />
            <h2 className="text-2xl font-bold">
              Pending Requests ({pendingAppointments.length})
            </h2>
          </div>

          {pendingAppointments.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#E8DCCB] p-10 text-center text-gray-500">
              No Pending Requests
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {pendingAppointments.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-3xl border border-yellow-200 shadow-sm hover:shadow-xl transition-all duration-300 p-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-xl text-gray-800">
                        {item.type}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Appointment Request
                      </p>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                      Pending
                    </span>
                  </div>

                  <div className="mt-6 space-y-4 text-gray-600">
                    <div className="flex items-center gap-3">
                      <User size={18} />
                      <span>{item.user.name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Wrench size={18} />
                      <span>{item.reason}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar size={18} />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock size={18} />
                      <span>{item.time}</span>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={() => handleConfirm(item._id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
                    >
                      Confirm
                    </button>

                    <button
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
                      onClick={() => handleIgnore(item._id)}
                    >
                      Ignore
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= Completed ================= */}

        <div>
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="text-green-600" size={30} />
            <h2 className="text-2xl font-bold">
              Completed Appointments ({completedAppointments.length})
            </h2>
          </div>

          {completedAppointments.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#E8DCCB] p-10 text-center text-gray-500">
              No Completed Appointments
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {completedAppointments.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-3xl border border-green-200 shadow-sm hover:shadow-lg transition p-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-xl text-gray-800">
                        {item.type}
                      </h3>

                      <p className="text-sm text-gray-500">Service Completed</p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusStyles[item.status] ||
                        "bg-gray-100 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-6 space-y-4 text-gray-600">
                    <div className="flex items-center gap-3">
                      <User size={18} />
                      <span>{item.user.name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <ClipboardList size={18} />
                      <span>{item.reason}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar size={18} />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock size={18} />
                      <span>{item.time}</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      disabled
                      className="w-full bg-green-100 text-green-700 py-3 rounded-xl font-semibold cursor-not-allowed"
                    >
                      ✓ Appointment Completed
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
