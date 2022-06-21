exports.userSignUpValidator = (req, res, next) => {
  req.chack("name", "name is required").notEmpty();
  req.check("email").isEmail();
  req.check("password").notEmpty().isLength({ min: 6 });
};
