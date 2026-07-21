import React, { useState, useEffect } from "react";
import { getappontments } from "../Api/api";
import {
  Calendar,
  Clock,
  Settings,
  Clock3,
  ShieldCheck,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const orders = [
  {
    id: "#ORD1025",
    product: "Medical Body Scale",
    price: "₹6999",
    quantity: 1,
    status: "Delivered",
    date: "16 Jul 2026",
  },
  {
    id: "#ORD1026",
    product: "Kitchen Scale 5kg",
    price: "₹899",
    quantity: 2,
    status: "Processing",
    date: "17 Jul 2026",
  },
];

export default function UserDashboard() {
  const [tab, setTab] = useState("appointments");
  const [appointments, setAppointments] = useState([]);

  const statusConfig = {
    Pending: {
      icon: Clock3,
      className: "bg-yellow-100 text-yellow-700 border-yellow-200",
    },
    Confirmed: {
      icon: ShieldCheck,
      className: "bg-blue-100 text-blue-700 border-blue-200",
    },
    Completed: {
      icon: CheckCircle2,
      className: "bg-green-100 text-green-700 border-green-200",
    },
    Cancelled: {
      icon: XCircle,
      className: "bg-red-100 text-red-700 border-red-200",
    },
  };

  const StatusIcon = statusConfig[appointments.status]?.icon || Clock3;

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await getappontments();
        setAppointments(res.appointments);
      } catch (error) {
        console.error("API Error:", error);
      }
    }

    fetchAppointments();
  }, []);

  return (
    <section className="min-h-screen bg-[#FAF4ED] py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Navigation */}

        <div className="bg-white rounded-2xl shadow-md p-2 inline-flex mb-8">
          <button
            onClick={() => setTab("appointments")}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
              tab === "appointments"
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Appointments ({appointments.length})
          </button>

          <button
            onClick={() => setTab("orders")}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
              tab === "orders"
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Orders ({orders.length})
          </button>
        </div>

        {/* Orders */}

        {tab === "orders" && (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow p-6 border border-[#E8DCCB]"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{order.product}</h2>

                    <p className="text-gray-500 mt-1">{order.id}</p>
                  </div>

                  <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
                    {order.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  <div>
                    <p className="text-gray-500 text-sm">Price</p>

                    <h3 className="font-semibold">{order.price}</h3>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Quantity</p>

                    <h3 className="font-semibold">{order.quantity}</h3>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Order Date</p>

                    <h3 className="font-semibold">{order.date}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Appointment */}
        {tab === "appointments" && (
          <div className="space-y-6">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="bg-white rounded-3xl border border-[#E8DCCB] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-[#FFF8EF] via-[#FAF4ED] to-[#FFF8EF] px-6 py-5 border-b border-[#E8DCCB]">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                          {appointment.reason}
                        </h2>

                        <div className="flex items-center gap-2 mt-2">
                          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                            #{appointment._id.slice(-6)}
                          </span>

                          <span className="px-3 py-1 rounded-full bg-[#F4E8D6] text-[#8B5E34] text-xs font-semibold">
                            {appointment.type}
                          </span>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex flex-col items-start sm:items-end">
                        <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                          Appointment Status
                        </p>

                        <span
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border shadow-sm ${
                            statusConfig[appointment.status]?.className ||
                            "bg-gray-100 text-gray-700 border-gray-200"
                          }`}
                        >
                          <StatusIcon size={18} />
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
                        <div className="bg-blue-100 p-3 rounded-xl">
                          <Calendar className="text-blue-600" size={22} />
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">
                            Appointment Date
                          </p>
                          <h3 className="font-semibold text-gray-800">
                            {new Date(appointment.date).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
                        <div className="bg-purple-100 p-3 rounded-xl">
                          <Clock className="text-purple-600" size={22} />
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Time</p>
                          <h3 className="font-semibold text-gray-800">
                            {appointment.time}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
                        <div className="bg-amber-100 p-3 rounded-xl">
                          <Settings className="text-amber-600" size={22} />
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Service Type</p>
                          <h3 className="font-semibold text-gray-800">
                            {appointment.type}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-t border-gray-100 pt-5">
                      <div>
                        <p className="text-xs text-gray-500">
                          Appointment Reference
                        </p>

                        <p className="font-mono font-semibold text-gray-700">
                          #{appointment._id}
                        </p>
                      </div>

                      <div className="text-sm text-gray-500">
                        Created on{" "}
                        <span className="font-semibold text-gray-700">
                          {new Date(appointment.createdAt).toLocaleDateString(
                            "en-GB",
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                No appointments found.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
