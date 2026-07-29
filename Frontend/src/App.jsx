import Footer from "./Componenets/Footer";
import Navbar from "./Componenets/Navbar";
import MainLayout from "./Layouts/MainLayout";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CartPage from "./Pages/CartPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCart } from "./Redux/Features/Cart/cartapi";
import AdminDashboard from "./Pages/AdminDashboard";
import ProductDetails from "./Pages/ProductDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDashboard from "./Pages/UserDashboard";
import AppointmentRequests from "./Pages/Appointment";
import Product from "./Pages/Product";
import ProductForm from "./Pages/ProductForm";
import OrderForm from "./Pages/OrderForm";
import UserRoute from "./Layouts/UserRoutes";
import AdminRoute from "./Layouts/AdminRoute";

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route element={<UserRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/activity" element={<UserDashboard />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/orderform" element={<OrderForm />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/product" element={<Product />} />
              <Route path="/addproduct" element={<ProductForm />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/appointment" element={<AppointmentRequests />} />
            </Route>
            <Route path="*" element={<Home />} />
          </Route>

          <Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
        <ToastContainer position="top-right" autoClose={2500} theme="colored" />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
