const express = require("express");
const router = express.Router();
const {
  createCard,
  getAllCards,
  getCard,
  getSellerCards,
  updateCard,
  deleteCard,
  getSoldCards,
  checkCardValidation
} = require("../controllers/cardController");
const Auth = require("../middleware/auth");
const IsSeller = require("../middleware/IsSeller");
const IsAdmin = require("../middleware/IsAdmin")
const cardValidation = require("../middleware/Validator/card.validator");

router.post("/", Auth, IsSeller, createCard);
router.get("/seller_prod", Auth, IsSeller, getSellerCards);
router.get("/sold_seller_prod", Auth, IsSeller, getSoldCards);
router.get("/", getAllCards);
router.get("/:cardId", getCard);
router.put('/update/:id',Auth, IsSeller,updateCard)
router.delete('/delete/:id',Auth,deleteCard)
router.post("/check-validation",Auth,checkCardValidation)

module.exports = router;
