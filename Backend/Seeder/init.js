const mongoose = require("mongoose");
const { data } = require("./data");
const Product = require("../Model/product");
const Appointment = require("../Model/appointment");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/portfoliio");
}

main()
  .then(() => console.log("Mongodb conect"))
  .catch((e) => {
    console.log("Error Occured ", e);
  });

const initDb = async () => {
  const types = [
    "Service Center",
    "Home Repair",
    "Consultation",
    "Product Demo",
  ];

  const statuses = ["Pending", "Confirmed", "Completed", "Cancelled"];

  const reasons = [
    "Battery Issue",
    "Screen Replacement",
    "Software Update",
    "Need Product Demo",
    "General Consultation",
    "Device Not Charging",
    "Warranty Claim",
    "Repair Required",
    "Installation Support",
    "Maintenance Check",
  ];

  const appointments = [];

  for (let i = 1; i <= 30; i++) {
    appointments.push({
      user: "6a575b5f824b124d274c6fed",
      type: types[Math.floor(Math.random() * types.length)],
      date: new Date(
        2026,
        Math.floor(Math.random() * 12), // Month
        Math.floor(Math.random() * 28) + 1, // Day
      ),
      time: `${String(Math.floor(Math.random() * 12) + 1).padStart(
        2,
        "0",
      )}:00 ${Math.random() > 0.5 ? "AM" : "PM"}`,
      reason: reasons[Math.floor(Math.random() * reasons.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }

  await Appointment.insertMany(appointments);
  await Product.deleteMany({});
  await Product.insertMany(data);
};
initDb();
