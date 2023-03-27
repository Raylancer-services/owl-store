const User = require("../models/userModel");
const Card = require("../models/cardModel");

//Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users: users });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//Get user
exports.getUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ msg: err.message });
  }
};

///Get user by Id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//Add to cart
exports.addToCart = async (req, res) => {
  const itemId = req.body.itemId;
  if (!itemId) {
    const error = new Error("ItemId not provided");
    error.statusCode = 404;
    throw error;
  }
  try {
    const user = req.user;
    console.log(user, "user cart item");
    if (user.cart.length > 0)
      return res
        .status(400)
        .json({ message: "You have already a item in your cart." });
    let itemToAdd = await Card.findById(itemId);
    if (itemToAdd) {
      user.addToCart(itemToAdd);
    }
    res
      .status(200)
      .json({ message: "Item successfully added to cart.", result: itemToAdd });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//Get user cart
exports.getCart = async (req, res) => {
  User.findById(req.user)
    .then((account) => {
      return User.findOne({ _id: account?._id });
    })
    .then((user) => {
      return user.populate("cart.items.itemId");
    })
    .then((user) => {
      const cartItems = user.cart.items;
      let totalPrice = 0;
      const total = cartItems.reduce(
        (accumulator, current) => accumulator + current?.itemId?.price * 1,
        totalPrice
      );
      res.json({
        cart: cartItems,
        totalPrice: total,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Remove item from cart
exports.removeItem = async (req, res) => {
  const itemId = req.body.itemId;
  if (!itemId) {
    const error = new Error("ItemId not provided");
    error.statusCode = 404;
    throw error;
  }
  User.findById(req.user)
    .then((account) => {
      return User.findOne({ _id: account._id });
    })
    .then((user) => {
      return user.removeFromCart(itemId);
    })
    .then((result) => {
      res.status(200).json({ message: "Item successfully removed from cart." });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};
