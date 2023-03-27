const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username not provided "],
    },
    password: {
      type: String,
      required: true,
    },
    email_id: {
      type: String,
      unique: [true, "email already exists in database!"],
      lowercase: true,
      trim: true,
      required: [true, "email not provided"],
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "{VALUE} is not a valid email!",
      },
    },
    role: {
      type: String,
      enum: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SELLER"],
      default: "ROLE_USER",
    },
    items: [{ type: mongoose.Types.ObjectId, ref: "Card" }], //All created cards by seller
    cart: {
      //only for user
      items: [
        {
          _id: false,
          itemId: {
            type: mongoose.Types.ObjectId,
            ref: "Card",
          },
        },
      ],
    },
    walletBalance: {
      type: Number,
      default: 0,
    },
    approvedByAdmin: {
      //only for merchant
      type: Boolean,
      default: false,
    },
    accountStatus:{
      type: String,
      enum: ["ACTIVE", "BLOCKED"],
      default: "ACTIVE",
    }
  },
  { timestamps: true }
);

UserSchema.methods.addToCart = function (item) {
  const cartItemIndex = this.cart.items.findIndex((cp) => {
    return cp.itemId.toString() === item._id.toString();
  });
  const updatedCartItems = [...this.cart.items];

  updatedCartItems.push({
    itemId: item._id,
  });
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

UserSchema.methods.removeFromCart = function (itemId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.itemId.toString() !== itemId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

UserSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", UserSchema);
