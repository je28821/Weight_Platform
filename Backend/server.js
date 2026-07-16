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

// Connect to Database
connectDB();

//Middlawares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/appointment", appointmentRoutes);

app.listen(port, () => {
  console.log(`Server is Listining On ${port}`);
});
