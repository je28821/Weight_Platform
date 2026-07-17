# ⚖️ Weight Scale Platform

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
```

---

## Install Frontend

```bash
cd Frontend
npm install
```

---

# 🔐 Environment Variables

## Backend (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## Frontend (.env)

```env
VITE_SERVER_URL=http://localhost:5000

VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

# ▶️ Running Project

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

---

# 📸 Screenshots

Add screenshots here.

Example

```
Home Page

Product Page

Cart

Appointment Page

Login

Register

Admin Dashboard
```

---

# 🔮 Future Improvements

- Online Payment Gateway
- Order Management
- Wishlist
- Product Reviews
- Email Notifications
- SMS Notifications
- Inventory Management
- Sales Analytics
- Invoice Generation
- Admin Reports
- Dark Mode

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push the branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Jenish Prajapati**

MERN Stack Developer

GitHub: https://github.com/yourusername

LinkedIn: https://linkedin.com/in/yourprofile
