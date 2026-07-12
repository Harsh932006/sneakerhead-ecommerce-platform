require("dotenv").config();
const express = require("express");
const userModel = require("./src/models/user.model");
const authRoutes = require("./src/routes/auth.routes");
const productRoutes = require("./src/routes/product.routes");
const cartRoutes = require("./src/routes/cart.routes");
const reviewRoutes = require("./src/routes/review.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./src/config/db");

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));


app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", reviewRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Page not found"
  });
});


module.exports = app;