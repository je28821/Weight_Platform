const Appointment = require("../Model/appointment");
const Product = require("../Model/product");
const User = require("../Model/user");

module.exports.getDashboardData = async () => {
  const [
    totalUsers,
    totalProducts,
    totalAppointments,
    recentAppointments,
    appointmentChart,
  ] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Appointment.countDocuments(),
    Appointment.find()
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .limit(2),
    Appointment.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          appointments: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]),
  ]);

  return {
    stats: {
      totalUsers,
      totalProducts,
      totalAppointments,
      totalOrders: 0,
      revenue: 0,
    },
    recentAppointments,
    recentOrders: [],
    appointmentChart,
  };
};

module.exports.addProducts = async (image, data) => {
  try {
    const product = await Product.create({ ...data, image: image });

    return product;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
