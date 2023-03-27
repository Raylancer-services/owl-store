const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const {
  createDeposit,
  getUserBilling,
  txInfo,
  getTxMulti,
  updateBilling,
} = require("../controllers/billingController");

router.post("/", Auth, createDeposit); //create deposit
router.get("/", Auth, getUserBilling); //get billing list
router.post("/tx-info", txInfo); //get tx info
router.post("/tx-multi", getTxMulti); //get tx Multi
router.post("/update", updateBilling); //update Billing

module.exports = router;
