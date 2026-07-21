import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getDashboardData } from "../Api/api";
import { FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState({
    stats: {
      totalUsers: 0,
      totalProducts: 0,
      totalAppointments: 0,
      totalOrders: 0,
      revenue: 0,
    },
    recentAppointments: [],
    recentOrders: [],
    appointmentChart: [],
  });

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData = dashboard.appointmentChart.map((item) => ({
    month: months[item._id],
    appointments: item.appointments,
  }));

  console.log(chartData);
  useEffect(() => {
    async function fetchDashboard() {
      const res = await getDashboardData();
      console.log(res);

      if (res.success) {
        setDashboard(res.appointment);
      }
    }

    fetchDashboard();
  }, []);
  return (
    <div className="min-h-screen bg-[#FAF4ED] pb-12 font-sans text-gray-800">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 pt-10 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Overview
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Welcome back, Admin 👋 Here's what's happening today.
          </p>
        </div>
        {/* Profile Avatar / Indicator instead of Logout */}
        <Link
          to="/product"
          className="flex items-center gap-2 px-6 py-3 rounded-xl
             border border-amber-300
             bg-white
             text-amber-600
             font-semibold
             shadow-md
             hover:bg-amber-500
             hover:text-white
             hover:border-amber-500
             transition-all duration-300"
        >
          <FaBoxOpen className="text-lg" />
          <span>Product Management</span>
        </Link>
      </header>

      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <h3 className="text-gray-400 font-medium text-sm uppercase tracking-wider">
                Users
              </h3>
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-lg">
                +18%
              </span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 mt-4">
              {dashboard.stats.totalUsers}
            </h1>
            <p className="text-emerald-600 mt-2 text-sm font-medium">
              vs. last month
            </p>
          </div>

          {/* Card 2 */}
          {/* <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <h3 className="text-gray-400 font-medium text-sm uppercase tracking-wider">
                Orders
              </h3>
              <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-lg">
                Needs Attention
              </span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 mt-4">245</h1>
            <p className="text-amber-600 mt-2 text-sm font-medium">
              15 Pending dispatch
            </p>
          </div> */}

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <h3 className="text-gray-400 font-medium text-sm uppercase tracking-wider">
                Appointments
              </h3>
            </div>
            <h1 className="text-3xl font-black text-gray-900 mt-4">
              {dashboard.stats.totalAppointments}
            </h1>
            <p className="text-indigo-500 mt-2 text-sm font-medium">
              Scheduled
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <h3 className="text-gray-400 font-medium text-sm uppercase tracking-wider">
                Products
              </h3>
              <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-1 rounded-lg">
                Restock
              </span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 mt-4">
              {dashboard.stats.totalProducts}
            </h1>
            <p className="text-rose-500 mt-2 text-sm font-medium">
              8 Items low on stock
            </p>
          </div>
        </div>

        {/* Tables Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <button className="text-amber-600 text-sm font-semibold hover:text-amber-700">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100">
                    <th className="pb-4 font-medium">Customer</th>
                    <th className="pb-4 font-medium">Status</th>
                    <th className="pb-4 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition">
                    <td className="py-4 font-medium text-gray-800">
                      Rahul Patel
                    </td>
                    <td className="py-4">
                      <span className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-xl font-semibold text-xs">
                        Pending
                      </span>
                    </td>
                    <td className="py-4 text-right font-bold text-gray-700">
                      ₹2,400
                    </td>
                  </tr>
                  <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition">
                    <td className="py-4 font-medium text-gray-800">
                      Amit Shah
                    </td>
                    <td className="py-4">
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-xl font-semibold text-xs">
                        Delivered
                      </span>
                    </td>
                    <td className="py-4 text-right font-bold text-gray-700">
                      ₹5,600
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Appointments */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Appointments</h2>

              <button className="text-amber-600 text-sm font-semibold hover:text-amber-700">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100">
                    <th className="pb-4 font-medium">Customer</th>
                    <th className="pb-4 font-medium">Type</th>
                    <th className="pb-4 font-medium text-right">Status</th>
                  </tr>
                </thead>

                <tbody className="text-sm">
                  {dashboard.recentAppointments.length > 0 ? (
                    dashboard.recentAppointments.map((appointment) => (
                      <tr
                        key={appointment._id}
                        className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition"
                      >
                        <td className="py-4 font-medium text-gray-800">
                          {appointment.user?.name || "N/A"}
                        </td>

                        <td className="py-4 text-gray-500">
                          {appointment.type}
                        </td>

                        <td className="py-4 text-right">
                          <span
                            className={`px-3 py-1.5 rounded-xl font-semibold text-xs ${
                              appointment.status === "Pending"
                                ? "bg-orange-100 text-orange-700"
                                : appointment.status === "Accepted"
                                  ? "bg-indigo-100 text-indigo-700"
                                  : appointment.status === "Rejected"
                                    ? "bg-red-100 text-red-700"
                                    : appointment.status === "Completed"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {appointment.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="py-8 text-center text-gray-500"
                      >
                        No appointments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Interactive Revenue Chart */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Revenue Overview
            </h2>
            <select className="bg-gray-50 border-none text-sm text-gray-600 rounded-xl px-4 py-2 focus:ring-0 cursor-pointer">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f3f4f6"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "1rem",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="appointments"
                  stroke="#f59e0b"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Products */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Top Selling Products
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="font-semibold text-gray-700">
                    Digital Scale
                  </span>
                  <span className="text-gray-500">120 units</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-amber-500 h-2.5 rounded-full w-[80%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="font-semibold text-gray-700">
                    Kitchen Scale
                  </span>
                  <span className="text-gray-500">90 units</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-orange-400 h-2.5 rounded-full w-[60%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Notifications
            </h2>
            <ul className="space-y-5">
              <li className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl">
                    📦
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-amber-600 transition">
                    New Order Received
                  </span>
                </div>
                <span className="text-gray-400 text-xs font-medium">
                  5 min ago
                </span>
              </li>

              <li className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-xl">
                    📅
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-amber-600 transition">
                    New Appointment
                  </span>
                </div>
                <span className="text-gray-400 text-xs font-medium">
                  20 min ago
                </span>
              </li>

              <li className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-xl">
                    ⚠
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-amber-600 transition">
                    Product Low Stock
                  </span>
                </div>
                <span className="text-gray-400 text-xs font-medium">
                  1 hour ago
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
