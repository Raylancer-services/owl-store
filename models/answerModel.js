const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    ticket: {
        type: mongoose.Schema.ObjectId,
        ref: "Ticket",
        // required: true,
      },
    ticketId: mongoose.Types.ObjectId,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answer", AnswerSchema);
