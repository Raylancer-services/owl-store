const express = require("express");
const router = express.Router();
const WithdrawalModel = require("../models/withdrawalModel");
const OrderModel = require("../models/orderModel");
const Auth = require("../middleware/auth");
const User = require("../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;

router.post("/", Auth, async (req, res) => {
  const { amount, paymentAddress } = req.body;
  let user = await User.findById(req.user._id);
  if (user.walletBalance < amount)
    return res.status(500).json({ message: "Low balance!" });
  if (amount < 50)
    return res.status(500).json({ message: "Minimum withdrawal amount is 50" });
  const newWithdrawalRequest = new WithdrawalModel({
    amount: amount,
    paymentAddress: paymentAddress,
    createdBy: req.user._id,
  });
  try {
    const withdrawal = await newWithdrawalRequest.save();
    //deduct amount from seller wallet
    let recipient = await User.findById(req.user._id);
    let updateFields = {};
    let deductAmount = recipient.walletBalance - amount * 1;
    updateFields.walletBalance = deductAmount;
    let user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: updateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res
      .status(201)
      .send({ message: "New Withdrawal Request Created", withdrawal, user });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

//Approve withdraw request
router.post("/approve-withdraw-status", async (req, res) => {
  try {
    const { withdrawId } = req.body;
    let updateFields = {};
    updateFields.paymentStatus = "Approved";
    let withdraw = await WithdrawalModel.findOneAndUpdate(
      { _id: withdrawId },
      { $set: updateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).send({ message: "Status updated", withdraw });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

//Decline withdraw request // if Status=Declined refund deduct amount to seller.
router.post("/decline-withdraw-status", async (req, res) => {
  try {
    const { withdrawId } = req.body;
    let withdrawal = await WithdrawalModel.findById(withdrawId);
    let sellerId = withdrawal.createdBy;
    let seller = await User.findById(sellerId);
    let amount = withdrawal.amount;
    //Deposit deduct amount
    let updateFields = {};
    let moneyToDeposit = seller.walletBalance + amount * 1;
    updateFields.walletBalance = moneyToDeposit;
    let user = await User.findOneAndUpdate(
      { _id: sellerId },
      { $set: updateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    //Update status
    let withdrawalupdateFields = {};
    withdrawalupdateFields.paymentStatus = "Declined";
    let withdraw = await WithdrawalModel.findOneAndUpdate(
      { _id: withdrawId },
      { $set: withdrawalupdateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).send({ message: "Status updated", withdraw });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
});

//Get all Withdrawal Request
router.get("/", async (req, res) => {
  try {
    const withdrawalRequests = await WithdrawalModel.find({});
    res.status(200).json(withdrawalRequests);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

//Get seller withdrawal Request
router.get("/withdrawals",Auth,async (req,res) =>{
  try {
    const userId = req.user._id;
    const result = await User.aggregate([
      {
        $match: {
          _id: ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "withdraws", //must be collection name for ticket
          localField: "_id",
          foreignField: "createdBy",
          as: "Withdraws",
        },
      },
    ]);
    if (result.length > 0) {
      res.send(result[0].Withdraws);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
})

module.exports = router;
