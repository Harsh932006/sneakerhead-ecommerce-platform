# SneakerHead - MERN E-Commerce Platform

## Overview

SneakerHead is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce platform built as a personal project to learn and implement modern web development concepts.

The project features role-based authentication with separate User and Admin accounts, JWT-based authentication (access + refresh tokens), product management, a shopping cart, product reviews, and a React frontend connected to a RESTful Express API.

This repository currently represents **Version 2 (V2)** of the project, which migrates the original session-based authentication to JWT and adds a shopping cart and review system.

---

## Features

### User Features

* User Registration
* User Login
* User Logout
* Persistent Authentication using JWT Access & Refresh Tokens
* View All Available Products
* View Single Product Details
* Add / Remove Products from Cart
* Clear Cart
* Add / Delete Own Product Reviews
* Authentication State Management using React Context API

### Admin Features

* Admin Registration
* Admin Login
* Admin Logout
* Persistent Authentication using JWT Access & Refresh Tokens
* Create Products
* View Own Products
* Update Products
* Delete Products
* Product Ownership Verification
* Protected Admin Routes

### Product Management

* Create Product (with image upload via ImageKit)
* Read Products
* Update Product
* Delete Product (with image removal from ImageKit)
* Product Ownership Authorization
* Product Listing for Customers

### Cart Management

* Add Product to Cart
* View Cart
* Remove Product from Cart
* Clear Cart

### Review System

* Add Review on a Product
* View Reviews
* Delete Own Review

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Context API
* Tailwind CSS
* React Toastify

### Backend

* Node.js
* Express.js
* JSON Web Tokens (jsonwebtoken)
* MongoDB
* Mongoose
* Joi
* Multer
* ImageKit

### Authentication

* JWT-Based Authentication (Access Token + Refresh Token)
* HttpOnly Refresh Token Cookies
* Role-Based Authorization

---

## Project Structure

```bash
frontend/
│
├── src/
│   ├── admin/
│   │   ├── Pages/
│   │
│   ├── landing_page/
│   │   ├── Pages/
│   │   └── components/
│   │
│   ├── api/
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── package.json


backend/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── config/
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
    imageFileId,
    adminId
}
```

### Cart Model

```javascript
{
    userId,
    items: [
        { productId }
    ]
}
```

### Review Model

```javascript
{
    review,
    product,
    user
}
```

### Session Model (Refresh Token Tracking)

```javascript
{
    user,
    refreshTokenHash,
    ip,
    userAgent,
    revoked
}
```

---

## Authentication Flow

### User Authentication

1. User registers or logs in.
2. Password is hashed.
3. A short-lived access token and a longer-lived refresh token are issued.
4. The refresh token is stored in an httpOnly cookie; its hash is saved server-side.
5. The access token is used to authenticate API requests.
6. User remains authenticated until logout or refresh token expiry.

### Admin Authentication

1. Admin registers or logs in using the same access/refresh token flow as users, kept separate from user tokens/cookies.
2. Session stores adminId (via the access token payload).
3. Admin gains access to product management features.
4. Authorization checks ensure only product owners can modify their products.

---

## API Routes

### User Routes

```http
POST /api/auth/user-register
POST /api/auth/user-login
GET  /api/auth/user-refresh-token
GET  /api/auth/user-logout
GET  /api/auth/curr-user
```

### Admin Routes

```http
POST /api/auth/admin-register
POST /api/auth/admin-login
GET  /api/auth/admin-refresh-token
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

### Cart Routes

```http
POST   /api/cart/add
GET    /api/cart
DELETE /api/cart
DELETE /api/cart/clear
```

### Review Routes

```http
POST   /api/products/:id/review
GET    /api/products/reviews
DELETE /api/products/:id/review/:reviewId
```

---

## Authorization Rules

### Normal Users

Can:

* Register
* Login
* Logout
* View Products
* Add / Remove Products in Cart
* Add / Delete Own Reviews

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
* JWT Authentication
* Authentication Middleware
* Authorization
* Password Hashing
* CRUD Operations
* File Upload Handling
* Error Handling

---

## Learning Objectives

This project was built to gain practical experience with:

* Full Stack Development
* React Frontend Development
* Express Backend Development
* MongoDB Database Design
* JWT-Based Authentication
* Role-Based Authorization
* RESTful API Design
* Context API State Management

---

# Version 2 Status

### Completed Features

* User Authentication (JWT)
* Admin Authentication (JWT)
* Product CRUD Operations
* Product Ownership Validation
* Product Image Upload (ImageKit)
* Shopping Cart
* Product Reviews
* Protected Admin Routes
* Protected User Routes
* Authentication Middleware
* React Frontend Integration
* Context API Authentication State

---

# Future Improvements (Version 3)

The following features are planned for future releases:

## Security

* Better Password Encryption using bcrypt

## E-Commerce Features

* Wishlist
* Product Search
* Product Filtering
* Product Categories
* Product Ratings

## Admin Features

* Admin Dashboard Analytics
* Product Inventory Management
* Order Management
* Customer Management

## Media Handling

* Multiple Product Images
* Image Optimization

## User Experience

* Responsive Design
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