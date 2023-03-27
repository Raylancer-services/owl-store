const Order = require("../models/orderModel");
const Coinpayments = require("coinpayments");
const User = require("../models/userModel");
const SoldCard = require("../models/SoldCard");
const ObjectId = require("mongoose").Types.ObjectId;
const moment = require('moment')
const axios = require("axios");

const client = new Coinpayments({
  key: process.env.PUBLIC_KEY,
  secret: process.env.SECRET_KEY,
});


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


//Check card validation
const checkCardValidation = async (encodedString) => {
  try {
    const axiosConfig = {
      method: "get",
      url: `http://5.161.62.96:5000/ccbase/${encodedString}`,
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
};

//create order
exports.createOrder = async (req, res) => {
  const { items, status, payWith, totalPrice } = req.body;
  let loggedInUser = await User.findById(req.user._id);
  if (loggedInUser.walletBalance < totalPrice)
    return res.status(500).json({ message: "You dont have enough balance." });

  const newOrder = new Order({
    seller: req.body.items[0].itemId.createdBy,
    items: items.map((x) => ({
      item: x.itemId,
      // qwertyItems:x
    })),
    payWith,
    totalPrice,
    user: req.user._id,
    status,
    refund_status: false,
  });
  try {
    const order = await newOrder.save();
    //Deposit money to seller account
    //{640f150c5e1143573f8cacae}
    let depositPercent = 80;
    let amountToDeposit = (depositPercent / 100) * order.totalPrice;
    let recipient = await User.findById(order.seller);
    let updateFields = {};
    let moneyToDeposit = recipient.walletBalance + amountToDeposit * 1;
    updateFields.walletBalance = moneyToDeposit;
    let user = await User.findOneAndUpdate(
      { _id: recipient._id },
      { $set: updateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(201).send({ message: "New Order Created", order });
    let user1 = req.user;
    if (user1) {
      user1.clearCart();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Refund Money {CARD === 'DECLINED'}
exports.refundUser = async (req, res) => {
  try {
    const { OrderId, amount } = req.body;
    let order = await Order.findById(OrderId);
    let recipient = await User.findById(order.user);
    //Deposit amount to user wallet
    let updateFields = {};
    let moneyToDeposit = recipient.walletBalance + amount * 1;
    updateFields.walletBalance = moneyToDeposit;
    let user = await User.findOneAndUpdate(
      { _id: order.user },
      { $set: updateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    //Deduct amount from seller wallet
    let seller = await User.findById(order.seller);
    let sellerWalletBal = seller.walletBalance;
    let updateSeller = {};
    let deductAmount = sellerWalletBal - amount * 1;
    updateSeller.walletBalance = deductAmount;
    let slr = await User.findOneAndUpdate(
      { _id: order.seller },
      { $set: updateSeller },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    //Update order refund status
    let updateOrderField = {};
    updateOrderField.refund_status = true;
    let updatedOrder = await Order.findOneAndUpdate(
      { _id: order._id },
      { $set: updateOrderField },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).send({ message: "Refunded!", updatedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update order refund status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.body;
    let updateOrderField = {};
    updateOrderField.refund_status = true;
    let updateOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      { $set: updateOrderField },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).send({ message: "Updated!", updateOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all sold cards
exports.getAllSoldCards = async (req, res) => {
  try {
    const cards = await SoldCard.find({});
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//Update order validation status
exports.updateCardValidationStatus = async (req, res) => {
  try {
    const { orderId,encodedString } = req.body;
    let order = await Order.findById(orderId);
    if(!order) return res.status(400).send('Order not found!')
    let [err,cardStatusResponse] = await checkCardValidation(encodedString);
    let updateProductFields = {};
    updateProductFields.validationStatus = cardStatusResponse.data.status 
    let updatedOrder = await Order.findOneAndUpdate(
      { _id: order._id },
      { $set: updateProductFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json({
      data: updatedOrder,
      message: "SUCCESS",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//get user order
exports.getUserOrder = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get seller order
exports.getSellerOrder = async (req, res) => {
  try {
    const seller = req.query.seller || "";
    const sellerFilter = seller ? { seller } : {};
    const orders = await Order.find({ ...sellerFilter });
    res.send(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update order status

//Payment Integration

//Admin account info.
exports.getAccountInfo = async (req, res) => {
  try {
    const info = await client.getBasicInfo();
    const accountBalance = await client.balances({ all: "0" }); //{ all: "1"} get all coins balance
    const depositAddress = await client.getDepositAddress({ currency: "BTC" }); //{currency:"BTC"} - Any enabled currency. e.g 'BTC'
    res.status(200).json({
      AccountInfo: info,
      AccountBalance: accountBalance,
      DepositAddress: depositAddress,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create Tx
exports.createTx = async (req, res) => {
  try {
    const { orderId, cur1, cur2, amount, buyers_email, buyers_name } = req.body;
    const depositAddress = await client.getDepositAddress({ currency: "BTC" });

    let options = {
      cmd: "create_transaction",
      currency1: cur1,
      currency2: cur2,
      amount: amount,
      buyer_email: buyers_email,
      address: depositAddress,
      buyer_name: buyers_name,
    };

    let create_payment = await client.createTransaction(options);
    let updateFields = {};
    updateFields.tx_id = create_payment.txn_id;
    let order = await Order.findOneAndUpdate(
      { _id: orderId },
      { $set: updateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    let user = req.user;
    if (user) {
      user.clearCart();
    }
    res.status(201).send({ message: "New Tx Created", create_payment, order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// //Get Tx info
// exports.txInfo = async (req, res) => {
//   const { txID } = req.body;
//   try {
//     let transaction_info = await client.getTx({ txid: txID });
//     res.status(200).send({ message: "Tx info...", transaction_info });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// };

//Get multiple tx status

//Get a list of tx ids
