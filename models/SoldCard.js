const { string } = require("joi");
const mongoose = require("mongoose");

const SoldCardSchema = new mongoose.Schema(
  {
    cardNumber:{
        type:String,
        required:true
    },
    expiryDate:{
        type:String,
        required:true
    },
    cvv:{
        type:String,
        required:true
    },
    socialSecurityNumber:{
        type:String,
        // required:true
    },
    drivingLicenceNumber:{
        type:String,
        // required:true
    },
    price:{
        type:String,
        required:true
    },
    seller:{
        type:String,
        // required:true
    },
    customer:{
        type:String,
        // required:true
    },
    avaibility:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SoldCards", SoldCardSchema);
