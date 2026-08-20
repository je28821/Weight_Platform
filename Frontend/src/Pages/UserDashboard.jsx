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
          <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto">
            {orders.map((order) => (
              <div
                key={order._id}
                className="group bg-white rounded-2xl sm:rounded-3xl border border-[#E8DCCB] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* ================= HEADER ================= */}
                <div className="bg-gradient-to-r from-[#FFF8EF] via-[#FAF4ED] to-[#FFF8EF] px-4 sm:px-6 py-4 sm:py-5 border-b border-[#E8DCCB]">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
                    {/* Order Info & Badges */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between sm:block gap-2">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="bg-white p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-[#E8DCCB] shadow-sm hidden sm:flex items-center justify-center text-[#8B5E34]">
                            <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <div>
                            <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5 sm:mb-1">
                              Order ID
                            </p>
                            <h2 className="text-sm sm:text-lg font-bold text-gray-800">
                              #{order._id.slice(-8).toUpperCase()}
                            </h2>
                          </div>
                        </div>

                        {/* Mobile-only status pill */}
                        <div className="sm:hidden shrink-0">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-sm ${getStatusColor(
                              order.orderStatus,
                            )}`}
                          >
                            {order.orderStatus}
                          </span>
                        </div>
                      </div>

                      {/* Date & Payment Pills */}
                      <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-4">
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-gray-100 text-gray-500 text-[10px] sm:text-xs font-semibold shadow-sm">
                          <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F4E8D6] border border-[#E8DCCB] text-[#8B5E34] text-[10px] sm:text-xs font-bold shadow-sm">
                          <CreditCard className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          {order.payment.method}
                        </span>
                      </div>
                    </div>

                    {/* Desktop-only Status */}
                    <div className="hidden sm:flex flex-col items-end shrink-0">
                      <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-bold mb-1.5">
                        Status
                      </p>
                      <span
                        className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border shadow-sm ${getStatusColor(
                          order.orderStatus,
                        )}`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ================= BODY (PRODUCTS) ================= */}
                <div className="p-4 sm:p-6 flex-grow">
                  <div className="space-y-3 sm:space-y-4">
                    {order.products.map((item, index) => (
                      <React.Fragment key={item.product._id}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 group/item cursor-pointer">
                          {/* Product Info */}
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-[#FAF4ED]/30 p-1.5 sm:p-2">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover/item:scale-110"
                              />
                            </div>
                            <div className="flex flex-col">
                              <h3 className="text-xs sm:text-base font-bold text-gray-800 group-hover/item:text-[#8B5E34] transition-colors line-clamp-1">
                                {item.product.name}
                              </h3>
                              <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5 sm:mt-1">
                                {item.product.category}
                              </p>
                              <p className="text-xs sm:text-sm font-bold text-gray-600 mt-1 sm:mt-2">
                                ₹{item.price.toLocaleString("en-IN")}{" "}
                                <span className="text-gray-300 font-normal mx-1">
                                  ×
                                </span>{" "}
                                {item.quantity}
                              </p>
                            </div>
                          </div>

                          {/* Item Total */}
                          <div className="flex items-center justify-between sm:justify-end border-t sm:border-none pt-2 sm:pt-0 mt-2 sm:mt-0">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider sm:hidden">
                              Item Total
                            </p>
                            <h3 className="text-sm sm:text-base font-bold text-gray-900">
                              ₹
                              {(item.price * item.quantity).toLocaleString(
                                "en-IN",
                              )}
                            </h3>
                          </div>
                        </div>

                        {/* Divider between items */}
                        {index !== order.products.length - 1 && (
                          <div className="h-px w-full bg-[#E8DCCB]/40 my-1 sm:my-2" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* ================= FOOTER / ACTIONS ================= */}
                  <div className="mt-4 sm:mt-6 border-t border-[#E8DCCB]/60 pt-4 sm:pt-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Total Amount */}
                      <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-4">
                        <span className="text-[11px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider">
                          Order Total
                        </span>
                        <span className="text-lg sm:text-xl font-black text-gray-900">
                          ₹{order.totalAmount.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Appointment */}
        {tab === "appointments" && (
          <div className="space-y-4 sm:space-y-6">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="group bg-white rounded-2xl sm:rounded-3xl border border-[#E8DCCB] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* ================= HEADER ================= */}
                  <div className="bg-gradient-to-r from-[#FFF8EF] via-[#FAF4ED] to-[#FFF8EF] px-4 sm:px-6 py-4 sm:py-5 border-b border-[#E8DCCB]">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
                      {/* Title & Badges */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between sm:block gap-2">
                          <h2 className="text-lg sm:text-2xl font-bold text-gray-800 line-clamp-1">
                            {appointment.reason}
                          </h2>

                          {/* Mobile-only status pill (shows top right on small screens) */}
                          <div className="sm:hidden shrink-0">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-sm ${
                                statusConfig[appointment.status]?.className ||
                                "bg-gray-100 text-gray-700 border-gray-200"
                              }`}
                            >
                              <StatusIcon size={12} />
                              {appointment.status}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="px-2.5 py-1 rounded-lg bg-white border border-gray-100 text-gray-500 text-[10px] sm:text-xs font-semibold shadow-sm">
                            #{appointment._id.slice(-6)}
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-[#F4E8D6] border border-[#E8DCCB] text-[#8B5E34] text-[10px] sm:text-xs font-bold shadow-sm">
                            {appointment.type}
                          </span>
                        </div>
                      </div>

                      {/* Desktop-only Status */}
                      <div className="hidden sm:flex flex-col items-end shrink-0">
                        <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-bold mb-1.5">
                          Status
                        </p>
                        <span
                          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border shadow-sm ${
                            statusConfig[appointment.status]?.className ||
                            "bg-gray-100 text-gray-700 border-gray-200"
                          }`}
                        >
                          <StatusIcon size={16} />
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ================= BODY (DETAILS) ================= */}
                  <div className="p-4 sm:p-6 flex-grow">
                    {/* Tighter grid for mobile: 2 columns for date/time, full width for service */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                      {/* Date Block */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-gray-50/80 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-100">
                        <div className="bg-blue-100/50 p-2 sm:p-3 rounded-lg sm:rounded-xl text-blue-600 w-fit">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5 sm:mb-1">
                            Date
                          </p>
                          <h3 className="text-xs sm:text-sm font-bold text-gray-800">
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

                      {/* Time Block */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-gray-50/80 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-100">
                        <div className="bg-purple-100/50 p-2 sm:p-3 rounded-lg sm:rounded-xl text-purple-600 w-fit">
                          <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5 sm:mb-1">
                            Time
                          </p>
                          <h3 className="text-xs sm:text-sm font-bold text-gray-800">
                            {appointment.time}
                          </h3>
                        </div>
                      </div>

                      {/* Service Block (Spans 2 columns on mobile, 1 on desktop) */}
                      <div className="col-span-2 lg:col-span-1 flex flex-row items-center gap-3 sm:gap-4 bg-gray-50/80 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-100">
                        <div className="bg-amber-100/50 p-2 sm:p-3 rounded-lg sm:rounded-xl text-amber-600 shrink-0">
                          <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5 sm:mb-1">
                            Service Type
                          </p>
                          <h3 className="text-xs sm:text-sm font-bold text-gray-800 line-clamp-1">
                            {appointment.type}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* ================= FOOTER ================= */}
                    <div className="mt-4 sm:mt-6 border-t border-[#E8DCCB]/60 pt-4 sm:pt-5">
                      <div className="flex items-center justify-between gap-4">
                        {/* Created Date */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider">
                            Booked On
                          </span>
                          <span className="text-[11px] sm:text-sm text-gray-600 font-bold">
                            {new Date(appointment.createdAt).toLocaleDateString(
                              "en-GB",
                            )}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <button
                          onClick={() => handleDelete(appointment._id)}
                          className="flex items-center justify-center gap-1.5 sm:gap-2
                  px-3 sm:px-5 py-2 sm:py-2.5
                  rounded-lg sm:rounded-xl
                  bg-red-50 text-red-600 hover:bg-red-500 hover:text-white 
                  font-bold text-xs sm:text-sm
                  transition-all duration-200
                  active:scale-95 group/btn"
                        >
                          <FaTrash className="text-xs sm:text-base group-hover/btn:animate-bounce" />
                          <span className="hidden sm:inline">
                            Cancel Booking
                          </span>
                          <span className="sm:hidden">Cancel</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-3xl border border-gray-100 border-dashed text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="text-gray-300 w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  No Appointments
                </h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  You don't have any upcoming appointments scheduled at the
                  moment.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
