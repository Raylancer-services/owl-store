const Billing = require("../models/billingModel");
const Coinpayments = require("coinpayments");

const client = new Coinpayments({
  key: process.env.PUBLIC_KEY,
  secret: process.env.SECRET_KEY,
});

//Create deposit
exports.createDeposit = async (req, res) => {
  const { amount, cur2, buyers_email, buyers_name } = req.body;
  try {
    const depositAddress = await client.getDepositAddress({ currency: "BTC" });
    let cur1 = process.env.DEFAULT_COIN;
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
    const result = await Billing.create({
      createdBy: req.user,
      txId: create_payment.txn_id,
      amount: create_payment.amount,
      amountDepositTowallet:amount,
      recipientAddress: create_payment.address,
      // process.env.DEPOSIT_ADDRESS,
      //  create_payment.address,
      checkoutUrl: create_payment.checkout_url,
      statusUrl: create_payment.status_url,
      payWith: cur2,
    });
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get user billing list
exports.getUserBilling = async (req, res) => {
  try {
    const billings = await Billing.find({ createdBy: req.user._id });
    res.send(billings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Tx info
exports.txInfo = async (req, res) => {
  const { txID } = req.body;
  try {
    let transaction_info = await client.getTx({ txid: txID });
    res.status(200).send({ message: "Tx info...", transaction_info });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//Get Tx info list

exports.getTxMulti = async (req, res) => {
  const {
    txIDs: [],
  } = req.body;
  try {
    let transaction_info_list = await client.getTxMulti(txIDs);
    res.status(200).send({ message: "Tx list...", transaction_info_list });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//update billing
exports.updateBilling = async (req, res) => {
  try {
    const { billingId, paymentApproved } = req.body;
    let updateFields = {};
    updateFields.paymentApproved = paymentApproved;
    let billing = await Billing.findOneAndUpdate(
      { _id: billingId },
      { $set: updateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).send({ message: "update!", billing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
