const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

//Import Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");

//config App
const app = express();
require("dotenv").config();

console.log(process.env.DATABASE);

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("db connectd"))
  .catch(() => console.error("not connect to the database"));

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app is running on port ${port} ...`));
