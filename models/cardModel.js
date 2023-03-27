const { boolean } = require("joi");
const mongoose = require("mongoose");

const addressInfo = {
  street: String,
  country: String,
  state: String,
  city: String,
  zip: String,
  phoneNo: Number,
};

const CardSchema = new mongoose.Schema(
  {
    cardNumber: {
      type: String,
      required: true,
      unique:true
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
      // unique:true
    },
    socialSecurityNumber: {
      type: String,
      // required: true,
      // unique:true
    },
    drivingLicenceNumber: {
      type: String,
      // required: true,
      // unique:true
    },
    address: addressInfo,
    level: {
      type: String,
      required: true,
    },
    // class: {
    //   type: String,
    //   required: true,
    // },
    extraField: { type: [String] },
    price: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    otherDetails: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    avaibility:{
      type: String,
      enum: ["Sold","Available"],
      default: "Available",
    },
    validation_status:{
      type: String,
      default:"STATUS"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", CardSchema);
