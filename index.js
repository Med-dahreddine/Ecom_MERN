const express = require("express");
const mongoose = require("mongoose");

//Import Routes
const userRoutes = require("./routes/users");

//config App
const app = express();
require("dotenv").config();

console.log(process.env.DATABASE);

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("db connectd"))
  .catch(() => console.error("not connect to the database"));

//Routes Middleware
app.use("/api/users", userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app is running on port ${port} ...`));
