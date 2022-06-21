const express = require("express");
const { hello, signup } = require("../controllers/userController");
const router = express.Router();

router.get("/", hello);

router.post("/signup", signup);

module.exports = router;
