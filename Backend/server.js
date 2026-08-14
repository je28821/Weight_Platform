const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();
const express = require("express");
const connectDB = require("./Config/db");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const authRoutes = require("./Routes/authRoutes");
const productRoutes = require("./Routes/productsRoutes");
const appointmentRoutes = require("./Routes/appointmentRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const orderRoutes = require("./Routes/orderRoutes");
const notificationRoutes = require("./Routes/notificationRoutes");

// Connect to Database
connectDB();

//Middlawares
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/notifications", notificationRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening on ${port}`);
});
