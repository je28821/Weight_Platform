# ⚖️ Weight Scale Platform

<p align="center">

  <img src="https://img.shields.io/badge/React-18%2B-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-State%20Management-764ABC?logo=redux&logoColor=white" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-UI-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />

</p>

<p align="center">

  <img src="https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-REST_API-000000?logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-ODM-880000?logo=mongoose&logoColor=white" alt="Mongoose" />
  <img src="https://img.shields.io/badge/Zod-Validation-3E67B1" alt="Zod" />

</p>

<p align="center">

  <img src="https://img.shields.io/badge/JWT-Authentication-000000?logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Google-OAuth-EA4335?logo=google&logoColor=white" alt="Google OAuth" />
  <img src="https://img.shields.io/badge/Cloudinary-Image%20Storage-3448C5?logo=cloudinary&logoColor=white" alt="Cloudinary" />
  <img src="https://img.shields.io/badge/Vercel-Frontend-000000?logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Render-Backend-46E3B7?logo=render&logoColor=black" alt="Render" />

</p>

<p align="center">
  <strong>Full-stack MERN e-commerce and appointment management platform for weighing-scale products and services.</strong>
</p>

<p align="center">
  <a href="https://weight-platform.vercel.app">🌐 Live Demo</a>
  •
  <a href="https://github.com/je28821/Weight_Platform">💻 Source Code</a>
  •
  <a href="https://weight-platform-backend.onrender.com">⚙️ Backend API</a>
</p>

---

## 📖 About the Project

**Weight Scale Platform** is a full-stack MERN application designed for businesses that sell and service industrial and commercial weighing scales.

The platform provides customers with a complete experience for:

- 🛒 Browsing and purchasing products
- 📦 Managing shopping carts and orders
- 📅 Booking product demonstrations
- 🔧 Scheduling home repair services
- 💬 Booking consultations
- 👤 Managing their profile
- 🔐 Secure authentication

The application also includes an **admin panel** for managing products, customers, orders, and appointments.

---

## ✨ Features

### 👤 User Features

- 🔐 User registration and login
- 🔵 Google OAuth authentication
- 🔑 JWT-based authentication
- 👤 User profile management
- 🚪 Secure logout
- 🔎 Product search
- 🗂️ Product categories
- 📦 Product details and specifications
- 📊 Stock availability
- 🛒 Shopping cart
- 🔢 Cart quantity management
- 📦 Order placement
- 🧾 Order history
- 📅 Appointment booking
- 📱 Responsive UI

---

### 🛒 E-commerce Features

- Browse weighing-scale products
- View detailed product information
- View product specifications
- Check product availability
- Add products to cart
- Update cart quantities
- Remove products from cart
- Place orders
- View order history
- Admin order management
- Product image upload using Cloudinary

---

### 📅 Appointment Management

Customers can book different types of appointments:

- 🏷️ Product Demonstration
- 🔧 Home Repair
- 💬 Consultation

Each appointment can include:

- Appointment type
- Date
- Time
- Reason
- Product selection
- Address
- City
- Village
- Pincode
- Appointment status

---

### 👨‍💼 Admin Features

- 🔐 Admin authentication
- 📊 Admin dashboard
- ➕ Add products
- ✏️ Edit products
- 🗑️ Delete products
- 🖼️ Upload product images
- 👥 View customers
- 📦 Manage orders
- 📅 Manage appointments
- ✅ Accept appointments
- ❌ Reject appointments

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │       Customer       │
                    │    Web Application   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     React + Vite     │
                    │     Tailwind CSS     │
                    │    Redux Toolkit     │
                    └──────────┬───────────┘
                               │
                         REST API / HTTPS
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Node.js + Express  │
                    │      Backend API     │
                    └──────────┬───────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
      ┌────────────┐    ┌────────────┐    ┌──────────────┐
      │  MongoDB   │    │ Cloudinary │    │ Google OAuth │
      │    Atlas   │    │   Images   │    │   + JWT      │
      └────────────┘    └────────────┘    └──────────────┘

      Frontend  → Vercel
      Backend   → Render
      Database  → MongoDB Atlas
      Images    → Cloudinary
```
