# SneakerHead - MERN E-Commerce Platform

## Overview

SneakerHead is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce platform built as a personal project to learn and implement modern web development concepts.

The project features role-based authentication with separate User and Admin accounts, session-based authentication, product management, and a React frontend connected to a RESTful Express API.

This repository currently represents **Version 1 (V1)** of the project and focuses on building a solid foundation for a scalable e-commerce application.

---

## Features

### User Features

* User Registration
* User Login
* User Logout
* Persistent Authentication using Sessions
* View All Available Products
* Authentication State Management using React Context API

### Admin Features

* Admin Registration
* Admin Login
* Admin Logout
* Create Products
* View Own Products
* Update Products
* Delete Products
* Product Ownership Verification
* Admin Authentication using Sessions

### Product Management

* Create Product
* Read Products
* Update Product
* Delete Product
* Product Ownership Authorization
* Product Listing for Customers

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Context API
* Tailwind CSS

### Backend

* Node.js
* Express.js
* Express Session
* MongoDB
* Mongoose

### Authentication

* Session-Based Authentication
* Express Sessions
* Role-Based Authorization

---

## Project Structure

```bash
client/
│
├── src/
│   ├── admin/
│   │   ├── Pages/
│   │   
│   │
│   ├── landing_page/
│   │   ├── Pages/
│   │   └── components/
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── package.json


server/
│
├── controllers/
├── models/
├── routes/
├── middlewares/
├── config/
│
├── app.js
└── package.json
```

---

## Database Models

### User Model

```javascript
{
    username,
    email,
    password
}
```

### Admin Model

```javascript
{
    username,
    orgName,
    email,
    password,
    address
}
```

### Product Model

```javascript
{
    name,
    desc,
    price,
    image,
    adminId
}
```

---

## Authentication Flow

### User Authentication

1. User registers.
2. Password is hashed.
3. User session is created.
4. Session ID is stored in cookies.
5. User remains authenticated until logout.

### Admin Authentication

1. Admin registers or logs in.
2. Session stores adminId.
3. Admin gains access to product management features.
4. Authorization checks ensure only product owners can modify their products.

---

## API Routes

### User Routes

```http
POST /api/auth/user-register
POST /api/auth/user-login
GET  /api/auth/user-logout
GET  /api/auth/curr-user
```

### Admin Routes

```http
POST /api/auth/admin-register
POST /api/auth/admin-login
GET  /api/auth/admin-logout
GET  /api/auth/curr-admin
```

### Product Routes

```http
POST   /api/products
GET    /api/products
GET    /api/products/:id
PATCH  /api/products/:id
DELETE /api/products/:id
GET    /api/products/admin-products
```

---

## Authorization Rules

### Normal Users

Can:

* Register
* Login
* Logout
* View Products

Cannot:

* Create Products
* Update Products
* Delete Products

### Admin Users

Can:

* Register
* Login
* Logout
* Create Products
* View Own Products
* Update Own Products
* Delete Own Products

Cannot:

* Modify products owned by another admin

---

## React Concepts Used

* Functional Components
* Props
* State Management
* useState
* useEffect
* useContext
* React Context API
* React Router
* useNavigate
* useParams
* Conditional Rendering
* Controlled Forms

---

## Backend Concepts Used

* REST APIs
* MVC Architecture
* MongoDB Relationships
* Session Management
* Authentication
* Authorization
* Password Hashing
* CRUD Operations
* Error Handling

---

## Learning Objectives

This project was built to gain practical experience with:

* Full Stack Development
* React Frontend Development
* Express Backend Development
* MongoDB Database Design
* Session-Based Authentication
* Role-Based Authorization
* RESTful API Design
* Context API State Management

---

# Version 1 Status

### Completed Features

* User Authentication
* Admin Authentication
* Product CRUD Operations
* Product Ownership Validation
* Session-Based Authentication
* React Frontend Integration
* Context API Authentication State

---

# Future Improvements (Version 2)

The following features are planned for future releases:

## Security

* Protected Admin Routes
* Protected User Routes
* Authentication Middleware Refactoring
* Better Password Encryption using bcrypt

## E-Commerce Features

* Shopping Cart
* Wishlist
* Product Search
* Product Filtering
* Product Categories
* Product Details Page
* Product Reviews
* Product Ratings

## Admin Features

* Admin Dashboard Analytics
* Product Inventory Management
* Order Management
* Customer Management

## Media Handling

* Cloudinary Image Uploads
* Multiple Product Images
* Image Optimization

## User Experience

* Responsive Design
* Loading States
* Toast Notifications
* Error Boundaries
* Skeleton Loaders

## Payment Integration

* Stripe Integration
* Razorpay Integration
* Order Checkout System

## Deployment

* MongoDB Atlas
* Backend Deployment (Render/Railway)
* Frontend Deployment (Vercel)
* CI/CD Pipeline

## Performance

* Pagination
* Lazy Loading
* API Optimization
* Database Indexing

---

## Author

Developed by Harsh Pal

A MERN Stack project built for learning full-stack web development and modern software engineering practices.
