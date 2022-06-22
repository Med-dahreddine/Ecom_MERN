const express = require("express");
const {
  hello,
  signup,
  signin,
  signout,
} = require("../controllers/userController");
const { userSignUpValidator } = require("../middelewares/userValidator");
const router = express.Router();

router.get("/", hello);

router.post("/signup", userSignUpValidator, signup);
router.get("/signin", signin);
router.get("/signout", signout);

module.exports = router;
