const express = require("express");
const { getOneUser } = require("../controllers/userController");
const { userById } = require("../middelewares/user");
const { requireSignIn, isAuth, isAdmin } = require("../middelewares/auth");

const router = express.Router();

router.get("/profile/:userId", requireSignIn, isAuth, getOneUser);

router.param("userId", userById);
module.exports = router;
