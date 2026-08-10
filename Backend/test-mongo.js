const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const mongoose = require("mongoose");

console.log("MONGO_URL exists:", !!process.env.MONGO_URL);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connection successful");
    console.log("Database:", mongoose.connection.name);
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed");
    console.error(err);
    process.exit(1);
  });
