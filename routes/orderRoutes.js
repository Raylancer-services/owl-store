const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const IsSeller = require("../middleware/auth");
const {
  createOrder,
  getSellerOrder,
  getUserOrder,
  getAccountInfo,
  createTx,
  refundUser,
  updateOrderStatus,
  updateCardValidationStatus,
} = require("../controllers/orderController");

router.post("/", Auth, createOrder);
router.get("/seller-orders", Auth, IsSeller, getSellerOrder); //Seller orders
router.get("/user-orders", Auth, getUserOrder); //USer orders
router.post("/update-order-refund-status", Auth, updateOrderStatus);
router.post("/update-card-validation-status", updateCardValidationStatus);

//coinpayment
router.get("/acc-info", getAccountInfo); //get admin info
router.post("/create-tx", Auth, createTx); //create tx
router.post("/refund", Auth, refundUser); //Refund

module.exports = router;
