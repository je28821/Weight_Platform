⚖️ Weight Scale Platform

A full-stack MERN application for managing and purchasing industrial weight scales with appointment scheduling for product demonstrations, consultations, and home repair services.

---

## 📌 Overview

Weight Scale Platform is an e-commerce web application that allows customers to browse weight scale products, manage their shopping cart, schedule appointments, and interact with an intuitive user interface.

The platform also includes an admin panel for managing products, appointments, and customer data.

---

# 🚀 Features

## 👤 User Features

- User Registration & Login
- Google OAuth Authentication
- JWT Authentication
- Responsive UI
- Product Search
- Product Details
- Shopping Cart
- Book Appointments
- Product Demo Appointment
- Home Repair Appointment
- Consultation Appointment
- User Profile
- Logout

---

## 🛒 Product Features

- View Products
- Product Details Page
- Product Categories
- Stock Availability
- Image Upload using Cloudinary

---

## 📅 Appointment Features

Users can schedule appointments for:

- Product Demo
- Home Repair
- Consultation

Appointment includes:

- Appointment Type
- Date
- Time
- Reason
- Product Selection
- Address (For Home Repair)

---

## 🛠 Admin Features

- Admin Login
- Dashboard
- Manage Products
- Add Products
- Edit Products
- Delete Products
- View Users
- View Orders
- View Appointments
- Accept Appointment
- Reject Appointment

---

# 🧰 Tech Stack

## Frontend

- React.js
- React Router
- Redux Toolkit
- Axios
- Tailwind CSS
- Framer Motion
- React Icons
- Zod Validation

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Multer
- Cloudinary

---

# 📂 Project Structure

```
WeightScalePlatform
│
├── Backend
│   ├── Config
│   ├── Controller
│   ├── Middleware
│   ├── Models
│   ├── Routes
│   ├── Services
│   ├── Utils
│   └── server.js
│
├── Frontend
│   ├── src
│   │   ├── API
│   │   ├── Components
│   │   ├── Pages
│   │   ├── Redux
│   │   ├── Utils
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/weight-scale-platform.git
```

```
cd weight-scale-platform
```

---

## Install Backend

```bash
cd Backend
npm install

3. Configure backend environment variables

Create:

Backend/.env

Example:

PORT=8080

MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

FRONTEND_URL=http://localhost:5173

4. Start the backend

npm run dev

5. Install frontend dependencies

Open another terminal:

cd Frontend
npm install
```

---

# 🔮 Future Improvements

- Order Management
- Wishlist
- Product Reviews
- Email Notifications
- Inventory Management
- Sales Analytics
- Invoice Generation
- Admin Reports

---
