const { string } = require("joi");
const mongoose = require("mongoose");

const BillingSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
    },
    paidByAdmin: {
      type: Boolean,
      default: "false",
    },
    txId: {
      type: String,
    },
    amount: {
      type: String,
    },
    amountDepositTowallet: {
      type: String,
    },
    recipientAddress: {
      type: String,
    },
    checkoutUrl: {
      type: String,
    },
    statusUrl: {
      type: String,
    },
    payWith: {
      type: String,
      enum: ["BTC", "LTC", "USDT"],
      default: "BTC",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Billing", BillingSchema);
