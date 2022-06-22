const express = require("express");
const { getOneUser } = require("../controllers/userController");
const { userById } = require("../middelewares/user");

const router = express.Router();

router.get("/profile/:userId", getOneUser);

router.param("userId", userById);
module.exports = router;
