import React, { useState, useEffect } from "react";
import { deleteAppointment, getappontments, getOrder } from "../Api/api";
import {
  Calendar,
  Clock,
  Settings,
  Clock3,
  ShieldCheck,
  CheckCircle2,
  Package,
  CreditCard,
  ChevronRight,
  ReceiptText,
  XCircle,
} from "lucide-react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const getStatusColor = (status) => {
  const colors = {
    Delivered: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    Cancelled: "bg-red-50 text-red-700 ring-red-600/10",
    Processing: "bg-blue-50 text-blue-700 ring-blue-600/20",
  };
  return colors[status] || "bg-amber-50 text-amber-700 ring-amber-600/20";
};

export default function UserDashboard() {
  const location = useLocation();

  const [tab, setTab] = useState(location.state?.activeTab || "appointments");
  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);

  const handleDelete = async (id) => {
    try {
      let res = await deleteAppointment(id);
      setAppointments(
        appointments.filter((appointment) => appointment._id !== id),
      );
    } catch (err) {
      console.log(err);
    }
  };

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
    async function fetchData() {
      try {
        const res = await getappontments();
        const data = await getOrder();
        setOrders(data.orders);
        setAppointments(res.appointments);
      } catch (error) {
        console.error("API Error:", error);
      }
    }

    fetchData();
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
          <div className="space-y-6 max-w-5xl mx-auto">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* --- Order Header --- */}
                <div className="bg-gray-50/50 p-6 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* Order Meta */}
                    <div className="flex items-start gap-4">
                      <div className="bg-white p-3 rounded-full border border-gray-200 shadow-sm hidden sm:block">
                        <Package className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Order Summary & Status */}
                    <div className="flex flex-wrap items-center gap-6 md:gap-8 bg-white md:bg-transparent p-4 md:p-0 rounded-xl border md:border-none border-gray-100">
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
                          <CreditCard className="w-3 h-3" /> Payment
                        </p>
                        <p className="font-semibold text-gray-900 text-sm">
                          {order.payment.method}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">
                          Total
                        </p>
                        <p className="font-bold text-gray-900 text-sm">
                          ₹{order.totalAmount.toLocaleString("en-IN")}
                        </p>
                      </div>

                      <div className="md:ml-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${getStatusColor(
                            order.orderStatus,
                          )}`}
                        >
                          {order.orderStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- Order Products --- */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.products.map((item, index) => (
                      <React.Fragment key={item.product._id}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer">
                          {/* Product Info */}
                          <div className="flex items-center gap-4">
                            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="flex flex-col">
                              <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {item.product.name}
                              </h3>
                              <p className="text-sm text-gray-500 mt-0.5">
                                {item.product.category}
                              </p>
                              <p className="text-sm font-medium text-gray-600 mt-2">
                                ₹{item.price.toLocaleString("en-IN")}{" "}
                                <span className="text-gray-400 font-normal mx-1">
                                  ×
                                </span>{" "}
                                {item.quantity}
                              </p>
                            </div>
                          </div>

                          {/* Item Total */}
                          <div className="flex items-center justify-between sm:justify-end sm:w-1/3 border-t sm:border-none pt-4 sm:pt-0">
                            <div className="text-left sm:text-right">
                              <p className="text-xs font-medium text-gray-500 mb-1 sm:hidden">
                                Item Total
                              </p>
                              <h3 className="text-base font-bold text-gray-900">
                                ₹
                                {(item.price * item.quantity).toLocaleString(
                                  "en-IN",
                                )}
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* Divider between items */}
                        {index !== order.products.length - 1 && (
                          <div className="h-px w-full bg-gray-100 my-4" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* --- Optional Footer / Actions --- */}
                  <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <ReceiptText className="w-4 h-4" />
                      Invoice
                    </button>
                    <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
                      Track Order
                      <ChevronRight className="w-4 h-4" />
                    </button>
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
                    <div className="mt-6 border-t border-[#E8DCCB] pt-5">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Created Date */}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="font-medium">Created On:</span>
                          <span className="px-3 py-1 rounded-full bg-[#FAF4ED] border border-[#E8DCCB] text-gray-700 font-semibold">
                            {new Date(appointment.createdAt).toLocaleDateString(
                              "en-GB",
                            )}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleDelete(appointment._id)}
                            className="flex items-center justify-center gap-2
                              px-5 py-2.5
                              rounded-xl
                              bg-red-500 hover:bg-red-600
                              text-white font-semibold
                              shadow-md hover:shadow-lg
                              transition-all duration-200
                              active:scale-95"
                          >
                            <FaTrash className="text-base" />
                            Delete
                          </button>
                        </div>
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
