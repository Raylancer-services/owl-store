const { string, boolean } = require("joi");
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    items: [
      {
        item: { type: Object, required: true },
        // qwertyItems:Object
      },
    ],
    // status: {
    //   type: String,
    //   enum: ["Placed", "Cancelled", "Completed"],
    //   default: "Placed",
    // },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    totalPrice: { type: Number, required: true },
    // isPaid: { type: Boolean, default: false },
    // tx_id:{
    //   type:String
    // },
    // withdrawalRequestCreated:{
    //   type:Boolean,
    //   default:'false'
    // }
    validationStatus:String,
    refund_status:String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
