const express = require("express");
const router = express.Router();
const ticketModel = require("../models/ticketModel");
const Auth = require("../middleware/auth");
const User = require("../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;

//Create ticket
router.post("/", Auth, async (req, res) => {
  try {
    const information = req.body;

    const ticket = await ticketModel.create({
      ...information,
      createdBy: req.user,
    });
    res.status(200).json({
      success: true,
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

//Get all tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await ticketModel.find({});
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

//Get user tickets
router.get("/user-tickets", Auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const result = await User.aggregate([
      {
        $match: {
          _id: ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "tickets", //must be collection name for ticket
          localField: "_id",
          foreignField: "createdBy",
          as: "Tickets",
        },
      },
    ]);
    if (result.length > 0) {
      res.send(result[0].Tickets);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//Close ticket
router.post("/close-ticket", Auth, async (req, res) => {
  try {
    const { ticketID } = req.body;
    const ticket = await ticketModel.findById(ticketID);
    if (!ticket) return res.status(404).json({ msg: "Ticket not found!" });
    //Update ticket status to closed
    let updateStatusField = {};
    updateStatusField.status = "CLOSED";
    let updateTicket = await ticketModel.findOneAndUpdate(
      { _id: ticketID },
      { $set: updateStatusField },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).send({ message: "Closed!", updateTicket });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

//Delete ticket
router.delete("/:id", async (req, res) => {
  try {
    const tickets = await ticketModel.findById(req.params.id);
    if (!tickets) return res.status(404).json({ msg: "Ticket not found!" });
    await ticketModel.findByIdAndRemove(req.params.id);
    res.json({ msg: "tickets removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: err,
    });
  }
});
module.exports = router;
