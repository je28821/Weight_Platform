⚖️ Weight Scale Platform

<p align="center">

<img src="https://img.shields.io/badge/React-18%2B-61DAFB?logo=react&logoColor=white" alt="React" />{=html}<img src="https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite&logoColor=white" alt="Vite" />{=html}<img src="https://img.shields.io/badge/Redux_Toolkit-State%20Management-764ABC?logo=redux&logoColor=white" alt="Redux Toolkit" />{=html}<img src="https://img.shields.io/badge/Tailwind_CSS-UI-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />{=html}<img src="https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white" alt="Node.js" />{=html}<img src="https://img.shields.io/badge/Express.js-API-000000?logo=express&logoColor=white" alt="Express.js" />{=html}<img src="https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />{=html}<img src="https://img.shields.io/badge/Cloudinary-Media-3448C5?logo=cloudinary&logoColor=white" alt="Cloudinary" />{=html}

</p>

<p align="center">

<img src="https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel&logoColor=white" alt="Vercel" />{=html}<img src="https://img.shields.io/badge/Backend-Render-46E3B7?logo=render&logoColor=black" alt="Render" />{=html}<img src="https://img.shields.io/badge/Authentication-JWT%20%7C%20Google%20OAuth-EA4335?logo=google&logoColor=white" alt="Authentication" />{=html}<img src="https://img.shields.io/badge/Validation-Zod-3E67B1" alt="Zod" />{=html}

</p>

<p align="center">

<strong>{=html}A full-stack MERN e-commerce and appointment managementplatform for weighing-scale products and services.</strong>{=html}

</p>

<p align="center">

<a href="https://weight-platform.vercel.app">{=html}🌐 LiveDemo</a>{=html} •<a href="https://github.com/je28821/Weight_Platform">{=html}💻 SourceCode</a>{=html} •<a href="https://weight-platform-backend.onrender.com">{=html}⚙️Backend API</a>{=html}

</p>

📖 About the Project

Weight Scale Platform is a full-stack MERN application designed forbusinesses that sell and service industrial and commercial weighingscales.

The platform combines:

🛒 E-commerce functionality

📦 Order management

📅 Appointment booking

🔐 Secure authentication

👨‍💼 Admin management

☁️ Cloud image storage

📊 Dashboard and operational management

🚀 Production deployment

The goal is to provide customers with one platform where they candiscover products, purchase products, manage orders, and scheduleproduct demonstrations, consultations, or home repair services.

✨ Key Features

👤 Customer Experience

🔐 User registration and login

🔑 JWT-based authentication

🔵 Google OAuth authentication

👤 User profile management

🚪 Secure logout

🔎 Product search

🗂️ Product categories

📦 Product details and specifications

📊 Stock availability

🛒 Shopping cart

🔢 Cart quantity management

🧾 Order placement and order history

📅 Appointment booking

📱 Responsive user interface

🛒 E-commerce

Browse available weighing-scale products

View detailed product specifications

Check product stock

Add/remove products from cart

Update cart quantities

Create orders

View previous orders

Admin order management

📅 Appointment Management

Customers can book:

🏷️ Product Demonstrations

🔧 Home Repair Services

💬 Consultations

Appointment details include:

Appointment type

Date

Time

Reason

Product selection

Address for home-repair appointments

Appointment status

👨‍💼 Admin Panel

🔐 Admin authentication

📊 Dashboard

➕ Add products

✏️ Edit products

🗑️ Delete products

🖼️ Upload product images

👥 View customers

📦 Manage orders

📅 Manage appointments

✅ Accept appointments

❌ Reject appointments

🏗️ System Architecture

                         ┌──────────────────────┐
                         │      Customer        │
                         │   Web Application    │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    React + Vite      │
                         │    Tailwind CSS      │
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
                    ┌───────────────┼────────────────┐
                    │               │                │
                    ▼               ▼                ▼
             ┌────────────┐  ┌────────────┐  ┌─────────────┐
             │ MongoDB    │  │ Cloudinary │  │ Google OAuth│
             │   Atlas    │  │   Images   │  │    / JWT    │
             └────────────┘  └────────────┘  └─────────────┘

          Frontend → Vercel
          Backend  → Render
          Database → MongoDB Atlas

🧰 Tech Stack

Frontend

Technology      Purpose

React.js        UI developmentVite            Frontend build toolingReact Router    Client-side routingRedux Toolkit   Global state managementAxios           API communicationTailwind CSS    Responsive stylingFramer Motion   UI animationsReact Icons     IconsZod             Form/input validation

Backend

Technology           Purpose

Node.js              RuntimeExpress.js           REST APIMongoose             MongoDB ODMJWT                  Authenticationbcrypt               Password hashingGoogle OAuth         Social authenticationMulter               File upload handlingHelmet               HTTP security headersCORS                 Cross-origin API accessCompression          Response compressionExpress Rate Limit   API rate limitingZod                  Server-side validation

Database & Cloud

Service         Purpose

MongoDB Atlas   Production databaseCloudinary      Product image storageVercel          Frontend deploymentRender          Backend deployment

🔐 Authentication & Security

The application includes several production-oriented security practices:

JWT-based authentication

Password hashing with bcrypt

Google OAuth authentication

Role-based admin authorization

Protected API routes

Zod input validation

CORS configuration

Helmet security headers

Express rate limiting

Environment-based secrets

Cloudinary-based media storage

Security note: Never commit .env files, API secrets, databasepasswords, or OAuth client secrets to GitHub.

📡 Main API Endpoints

Method     Endpoint               Description

POST     /api/auth/register   Register a userPOST     /api/auth/login      LoginPOST     /api/auth/google     Google authenticationGET      /api/products        Get productsPOST     /api/products        Create a productPUT      /api/products/:id    Update a productDELETE   /api/products/:id    Delete a productPOST     /api/cart            Add item to cartGET      /api/orders          Get user ordersPOST     /api/orders          Create an orderPOST     /api/appointment     Book an appointment

Endpoint names can be updated in this table if your final routedefinitions differ.

📂 Project Structure

Weight_Platform/
│
├── Backend/
│   ├── Config/
│   │   ├── db.js
│   │   ├── cloudinary.js
│   │   └── googleConfig.js
│   │
│   ├── Controller/
│   ├── Middleware/
│   ├── Models/
│   ├── Routes/
│   ├── Services/
│   ├── Utils/
│   ├── Seeder/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── Frontend/
│   ├── src/
│   │   ├── API/
│   │   ├── Components/
│   │   ├── Pages/
│   │   ├── Redux/
│   │   ├── Utils/
│   │   ├── Validator/
│   │   └── App.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore

🚀 Live Deployment

Layer           Platform        Status

Frontend        Vercel          🟢 LiveBackend         Render          🟢 LiveDatabase        MongoDB Atlas   🟢 ConnectedMedia Storage   Cloudinary      🟢 Configured

🌐 Application

Frontend:https://weight-platform.vercel.app

Backend API:https://weight-platform-backend.onrender.com

⚙️ Local Development

1. Clone the repository

git clone https://github.com/je28821/Weight_Platform.git
cd Weight_Platform

2. Install backend dependencies

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

6. Configure frontend environment variables

Create:

Frontend/.env

Example:

VITE_SERVER_URL=http://localhost:8080
VITE_GOOGLE_CLIENT_ID=your_google_client_id

7. Start the frontend

npm run dev

The frontend will normally run on:

http://localhost:5173

🌱 Seed Data

If the project contains seed data, run the seeder from the backend:

cd Backend/Seeder
node init.js

Make sure your .env points to the database you intend to seed beforerunning this command.

⚠️ If the seeder uses deleteMany(), review the script carefullybefore running it against a production database.

🧠 Challenges & Engineering Highlights

Some of the key engineering areas of this project include:

🔐 Authentication

Implemented both traditional JWT authentication and Google OAuth whilesupporting local development and production deployment.

☁️ Image Uploads

Integrated Multer with Cloudinary to handle product image uploadswithout storing image files directly on the application server.

📅 Appointment Workflow

Designed appointment booking around multiple service types, includingproduct demonstrations, consultations, and home repair.

🛒 State Management

Used Redux Toolkit to manage cart and application state across multipleReact pages.

🛡️ Validation & Security

Implemented Zod validation, bcrypt password hashing, JWT authorization,Helmet, CORS, and rate limiting.

🚀 Production Deployment

Deployed the React frontend to Vercel, the Express backend to Render,and connected the application to MongoDB Atlas and Cloudinary.

📸 Screenshots

Add your strongest screenshots here:

docs/
└── screenshots/
    ├── home.png
    ├── products.png
    ├── product-details.png
    ├── cart.png
    ├── appointment.png
    ├── orders.png
    ├── admin-dashboard.png
    └── login.png

Then use:

### 🏠 Home
![Home](docs/screenshots/home.png)

### 🛒 Shopping Cart
![Cart](docs/screenshots/cart.png)

### 📅 Appointment Booking
![Appointment](docs/screenshots/appointment.png)

### 👨‍💼 Admin Dashboard
![Admin Dashboard](docs/screenshots/admin-dashboard.png)

🔮 Future Improvements

💳 Online payment integration with Stripe/Razorpay

❤️ Wishlist

⭐ Product reviews and ratings

📧 Email notifications

📦 Advanced inventory management

📊 Sales analytics

🧾 Invoice generation

📈 Advanced admin reports

🔔 Real-time order/appointment notifications

🔎 Advanced product filtering and pagination

🤖 Automated CI/CD pipeline

📚 What I Learned

Through this project, I gained practical experience in:

Full-stack MERN application development

REST API design

MongoDB schema design with Mongoose

JWT and OAuth authentication

Redux state management

Form and API validation

Cloudinary integration

Role-based authorization

Production environment configuration

CORS and deployment debugging

Git/GitHub workflows

Vercel and Render deployment

🤝 Contributing

Contributions, suggestions, and improvements are welcome.

git checkout -b feature/your-feature
git commit -m "Add: your feature"
git push origin feature/your-feature

Then open a pull request.

📄 License

This project is currently available for learning, demonstration, andportfolio purposes.

👨‍💻 Author

Jenish Prajapati

MERN Stack Developer

Built with ❤️ using the MERN stack.

<p align="center">

<strong>{=html}⚖️ Weight Scale Platform</strong>{=html}<br />{=html} Full-stack e-commerce • Appointment booking • Adminmanagement

</p>
