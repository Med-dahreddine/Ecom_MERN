const express = require("express");
const { hello } = require("../controllers/userController");
const router = express.Router();

router.get("/", hello);

module.exports = router;
