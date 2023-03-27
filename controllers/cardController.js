const Card = require("../models/cardModel");
const User = require("../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;
const SoldCard = require("../models/SoldCard");
const axios = require("axios");
require("dotenv").config();

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

//create card
exports.createCard = async (req, res) => {
  const information = req.body;
  const newCard = new Card({
    ...information,
    createdBy: req.user,
  });
  try {
    await newCard.save();
    res.status(201).json({
      message: "Item created!",
      item: newCard,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//get all cards
exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//get card by id
exports.getCard = async (req, res) => {
  try {
    console.log(req.params.cardId, "ID______________");
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return res.status(404).json({ msg: "Card not found" });
    }
    res.status(200).json(card);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//Check card validation {http://5.161.62.96:5000/ccbase/NDE0NzIwMjUwOTAzOTE0M3wwOXwyNnw2OTM=}
exports.checkCardValidation = async (req, res) => {
  try {
    const { encodedString } = req.body;
    const axiosConfig = {
      method: "get",
      url: `http://5.161.62.96:5000/ccbase/${encodedString}`,
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    res.status(200).send(normalizedResponse);
  } catch (error) {
    const errorObject = normalizeServerError(error);
    res.status(500).json({
      message: errorObject,
    });
  }
};

//Get all seller products
exports.getSellerCards = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const result = await User.aggregate([
      {
        $match: {
          _id: ObjectId(sellerId),
        },
      },
      {
        $lookup: {
          from: "cards", //must be collection name for cards
          localField: "_id",
          foreignField: "createdBy",
          as: "Cards",
        },
      },
    ]);
    if (result.length > 0) {
      res.send(result[0].Cards);
    } else {
      res.status(404).send("Seller not found");
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send(error);
  }
};

//Get sold cards (Seller)
exports.getSoldCards = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const result = await User.aggregate([
      {
        $match: {
          _id: ObjectId(sellerId),
        },
      },
      {
        $lookup: {
          from: "SoldCards", //must be collection name for cards
          localField: "_id",
          foreignField: "createdBy",
          as: "SoldCards",
        },
      },
    ]);
    if (result.length > 0) {
      console.log(result);
      res.send(result[0].SoldCards);
    } else {
      res.status(404).send("Seller not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//Update Card
exports.updateCard = async (req, res) => {
  const {
    cardNumber,
    expiryDate,
    cvv,
    socialSecurityNumber,
    drivingLicenceNumber,
    // Class,
    level,
    price,
    bankName,
    type,
    otherDetails,
  } = req.body;
  let updateFields = {};
  if (cardNumber) updateFields.cardNumber = cardNumber;
  if (expiryDate) updateFields.expiryDate = expiryDate;
  if (cvv) updateFields.cvv = cvv;
  if (socialSecurityNumber)
    updateFields.socialSecurityNumber = socialSecurityNumber;
  if (drivingLicenceNumber)
    updateFields.drivingLicenceNumber = drivingLicenceNumber;
  if (level) updateFields.level = level;
  if (price) updateFields.price = price;
  if (bankName) updateFields.bankName = bankName;
  if (type) updateFields.type = type;
  if (otherDetails) updateFields.otherDetails = otherDetails;

  try {
    let product = await Card.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    product = await Card.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

//Delete Card
exports.deleteCard = async (req, res) => {
  try {
    const product = await Card.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: "Card not found" });

    await Card.findByIdAndRemove(req.params.id);

    res.json({ msg: "Card removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
