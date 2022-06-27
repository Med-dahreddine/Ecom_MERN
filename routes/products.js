const express = require("express");

const { userById } = require("../middelewares/user");

const router = express.Router();

const {
  relatedProduct,
  allProducts,
  createProduct,
  showProduct,
  productById,
  removeProduct,
  updateProduct,
} = require("../controllers/productController");

const { requireSignIn, isAuth, isAdmin } = require("../middelewares/auth");

router.get("/", allProducts);
router.get("related/:productId", relatedProduct);

router.get("/:productId", showProduct);

router.post("/create/:userId", [requireSignIn, isAuth, isAdmin], createProduct);

router.delete(
  "/:productId/:userId",
  [requireSignIn, isAuth, isAdmin],
  removeProduct
);

router.put(
  "/:productId/:userId",
  [requireSignIn, isAuth, isAdmin],
  updateProduct
);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
