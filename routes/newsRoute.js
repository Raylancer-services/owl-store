const express = require("express");
const router = express.Router();
const newsModel = require("../models/newsModel");
const ObjectId = require("mongoose").Types.ObjectId;

router.post("/", async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNews = new newsModel({
      title,
      content,
    });
    const news = await newNews.save();
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const news = await newsModel.find({});
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid news ID" });
    }
    const news = await newsModel.findById(id);
    if (!news) return res.status(404).json({ msg: "News not found" });
    await newsModel.findByIdAndRemove(news._id);
    res.send("News Removed!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: err,
    });
  }
});

module.exports = router;
