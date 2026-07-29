const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../Model/user");

const DB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ MongoDB Connected");

    await createAdmin();
  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
    process.exit(1);
  }
};

async function createAdmin() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminpassword = process.env.ADMIN_PASSWORD;

    const adminExists = await User.findOne({
      email: adminEmail,
    });

    if (adminExists) {
      console.log("✅ Admin already exists");
      return;
    }

    await User.create({
      name: "Admin",
      email: adminEmail,
      password: adminpassword,
      role: "admin",
      contactNo: 9876543210,
      address: [
        {
          address: "Head Office",
          village: "Main",
          city: "Surat",
        },
      ],
    });

    console.log("✅ Admin account created");
  } catch (err) {
    console.error("❌ Failed to create admin:", err.message);
  }
}

module.exports = DB;
