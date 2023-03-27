const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Order = require("../models/orderModel");
const Billing = require("../models/billingModel");
const Card = require("../models/cardModel");
const SoldCard = require("../models/SoldCard");
const Withdraw = require("../models/withdrawalModel");
const axios = require("axios");
const moment = require("moment");

function normalizeServerResponse(serverResponse) {
  let response = {
    data: serverResponse.data,
    status: serverResponse.status,
  };
  return response;
}

function normalizeServerError(serverResponse) {
  let response = {
    data: serverResponse.message,
    status: serverResponse.status,
  };
  return response;
}

//Register Admin
exports.registerAdmin = async (req, res) => {
  const { username, email_id, password } = req.body;
  try {
    const oldUser = await User.findOne({ email_id });

    if (oldUser)
      return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      username,
      email_id,
      password: hashedPassword,
      role: "ROLE_ADMIN",
    });

    const token = jwt.sign(
      { email: result.email, id: result._id, role: result.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "11h",
      }
    );

    res.status(201).json({ result, token, msg: "Registered successfull!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

//Add User
exports.addUser = async (req, res) => {
  const { username, email_id, password, role } = req.body;
  try {
    const oldUser = await User.findOne({ email_id });
    if (oldUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      username,
      email_id,
      password: hashedPassword,
      role: role,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id, role: result.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "11h",
      }
    );

    res.status(201).json({ result, token, msg: "User Added!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

//Approved seller
exports.approveSeller = async (req, res) => {
  try {
    const { userId } = req.body;
    let updateFields = {};
    updateFields.approvedByAdmin = true;
    let user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).send({ message: "Seller Approved!", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users: users });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    await User.findByIdAndRemove(req.params.id);

    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//Block User
exports.blockUser = async (req, res) => {
  try {
    const { userID } = req.body;
    let user = await User.findById(userID);
    let updateFields = {};
    updateFields.accountStatus = "BLOCKED";
    let block_user = await User.findOneAndUpdate(
      { _id: userID },
      { $set: updateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res
      .status(200)
      .send({ message: `BLOCKED ${user.username}`, block_user: block_user });
  } catch (error) {}
};

// ============================================== SELLER PAYMENT/WITHDRAWAL ===============================================================

//Deposit money to seller account after user order
exports.depositMoneyToSellerWallet = async (req, res) => {
  try {
    const { amount, sellerId } = req.body;
    let recipient = await User.findById(sellerId);
    let updateFields = {};
    let moneyToDeposit = recipient.walletBalance + amount * 1;
    updateFields.walletBalance = moneyToDeposit;
    let user = await User.findOneAndUpdate(
      { _id: sellerId },
      { $set: updateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res
      .status(200)
      .send({ message: `Deposited ${amount}$ to ${user?.username}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Deduct money from seller wallet after withdrawal req approved.
exports.deductMoneyFromSellerWallet = async (req, res) => {
  try {
  } catch (error) {}
};

//Deposit money to user/seller
exports.depositMoneyUser = async (req, res) => {
  try {
    const { amount, recipientId } = req.body;
    let recipient = await User.findById(recipientId);
    let updateFields = {};
    let moneyToDeposit = recipient.walletBalance + amount * 1;
    updateFields.walletBalance = moneyToDeposit;
    let user = await User.findOneAndUpdate(
      { _id: recipientId },
      { $set: updateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.send("Deposit!");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Payment approved / deposit balance   //TODO test required
exports.depositMoney = async (req, res) => {
  try {
    const { amount, userId, billingId } = req.body;
    let recipient = await User.findById(userId);
    let updateFields = {};
    let moneyToDeposit = recipient.walletBalance + amount * 1;
    updateFields.walletBalance = moneyToDeposit;
    let user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    let updateBillingFields = {};
    updateBillingFields.paidByAdmin = true;
    let billing = await Billing.findByIdAndUpdate(
      { _id: billingId },
      { $set: updateBillingFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res
      .status(200)
      .send({ message: `Deposited ${amount}$ to ${user?.username}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Check card validation
const checkCardValidation = async (cardNumber, expiryDate, cvv) => {
  let ExpiryDate = moment(expiryDate).format("MM|YY");
  let cardDetails = `${cardNumber}|${ExpiryDate}|0${cvv}`;
  let encodedString;
  if (typeof window !== "undefined") {
    encodedString = window.btoa(cardDetails);
  }
  try {
    const axiosConfig = {
      method: "get",
      url: `http://5.161.62.96:5000/ccbase/${encodedString}`,
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    // res.status(200).send(normalizedResponse?.data?.status);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
};

//Deduct amount after checkout
exports.deductMoney = async (req, res) => {
  try {
    const { amount, userId, orderId } = req.body;
    let recipient = await User.findById(userId);
    let updateFields = {};
    let moneyToDeposit = recipient.walletBalance - amount * 1;
    updateFields.walletBalance = moneyToDeposit;
    let user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    let updateOrderFields = {};
    updateOrderFields.isPaid = true;
    let order = await Order.findOneAndUpdate(
      { _id: orderId },
      { $set: updateOrderFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    let products = await Order.findById(orderId);

    //Update product validation status
    //Check card validation
    // const update_product_validation_status = products.items.map(async (obj) => {
    //   let updateProductFields = {};
    //   updateProductFields.validation_status = await checkCardValidation(
    //     obj.item.cardNumber,
    //     obj.item.expiryDate,
    //     obj.item.cvv
    //   );
    //   await Card.findOneAndUpdate(
    //     { _id: obj.item._id },
    //     { $set: updateProductFields },
    //     { new: true, upsert: true, setDefaultsOnInsert: true }
    //   );
    // });
    // await Promise.all(update_product_validation_status);

    //Create new card entry in db and delete sold cards from Cards collection
    const createSoldCard = products?.items.map(async (o) => {
      const newSoldCard = new SoldCard({
        cardNumber: o.item.cardNumber,
        expiryDate: o.item.expiryDate,
        cvv: o.item.cvv,
        socialSecurityNumber: o?.item?.socialSecurityNumber,
        drivingLicenceNumber: o?.item?.drivingLicenceNumber,
        price: o.item.price,
        seller: o.item?.seller,
        customer: o.item?.customer,
        avaibility: o.item.avaibility,
        type: o.item.type,
        country: o.item.address.country,
        state: o.item.address.state,
      });
      await newSoldCard.save();
    });
    await Promise.all(createSoldCard);
    const deleteSoldCards = products.items.map(async (obj) => {
      await Card.findByIdAndRemove(obj.item._id);
    });
    await Promise.all(deleteSoldCards);
    res.status(200).send({ message: "success!", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({ orders: orders });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
//Update order status
exports.updateOrder = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    let updateFields = {};
    updateFields.status = status;
    let order = await Order.findOneAndUpdate(
      { _id: orderId },
      { $set: updateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).send({ message: "Updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Delete order
exports.deleteOrder = async (req, res) => {};

//Get all billings
exports.getBillings = async (req, res) => {
  try {
    const billings = await Billing.find();
    res.json({ billings: billings });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
//Delete Billing
exports.deleteBilling = async (req, res) => {};

//withdrawal request
//Update Status

//Delete

//News
//Create
//Update
//Delete

//Tickets
//Create
//Update
//Delete
