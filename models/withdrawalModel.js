const { string } = require("joi");
const mongoose = require("mongoose");

const WithdrawalSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: true,
    },
    paymentAddress: {
      type: String,
      required: true,
    },
    paidByAdmin: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    paymentStatus:{
      type: String,
      enum: ["Approved", "Declined","Pending"],
      default: "Pending",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Withdraw", WithdrawalSchema);
