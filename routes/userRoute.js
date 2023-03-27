const express = require("express");
const router = express.Router();
const {
  getUsers,
  addToCart,
  getCart,
  removeItem,
  getUser,
  getUserById,
} = require("../controllers/userController");
const Auth = require("../middleware/auth");

router.get("/users", getUsers);
router.get("/", Auth, getUser);
router.post("/cart", Auth, addToCart);
router.get("/cart", Auth, getCart);
router.post("/cart/delete", Auth, removeItem);
router.get("/user-by-id/:id", getUserById);


module.exports = router;
