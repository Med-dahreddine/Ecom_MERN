const express = require("express");
const {
  hello,
  signup,
  signin,
  signout,
} = require("../controllers/authController");
const { userSignUpValidator } = require("../middelewares/userValidator");
const { requireSignIn } = require("../middelewares/auth");
const router = express.Router();

router.get("/", hello);

router.post("/signup", userSignUpValidator, signup);
router.get("/signin", signin);
router.get("/signout", signout);

router.get("/hello", requireSignIn, (req, res) => {
  res.send("hello there");
});

module.exports = router;
