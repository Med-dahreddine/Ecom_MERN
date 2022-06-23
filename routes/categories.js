const express = require("express");

const { userById } = require("../middelewares/user");

const router = express.Router();

const { createCategory } = require("../controllers/categoryController");

const { requireSignIn, isAuth, isAdmin } = require("../middelewares/auth");

router.post(
  "/create/:userId",
  [requireSignIn, isAuth, isAdmin],
  createCategory
);

router.param("userId", userById);
module.exports = router;
