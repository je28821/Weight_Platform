import React, { useState } from "react";

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

const appointments = [
  {
    id: "#APT201",
    product: "Medical Body Scale",
    type: "Product Demo",
    date: "20 Jul 2026",
    time: "11:00 AM",
    status: "Confirmed",
  },
  {
    id: "#APT202",
    product: "Platform Scale",
    type: "Home Repair",
    date: "24 Jul 2026",
    time: "3:30 PM",
    status: "Pending",
  },
];

export default function MyActivity() {
  const [tab, setTab] = useState("appointments");

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
          <div className="space-y-5">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white rounded-2xl shadow p-6 border border-[#E8DCCB]"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {appointment.product}
                    </h2>

                    <p className="text-gray-500 mt-1">{appointment.id}</p>
                  </div>

                  <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                    {appointment.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-4 gap-6 mt-6">
                  <div>
                    <p className="text-gray-500 text-sm">Type</p>

                    <h3 className="font-semibold">{appointment.type}</h3>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Date</p>

                    <h3 className="font-semibold">{appointment.date}</h3>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Time</p>

                    <h3 className="font-semibold">{appointment.time}</h3>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Status</p>

                    <h3 className="font-semibold">{appointment.status}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
