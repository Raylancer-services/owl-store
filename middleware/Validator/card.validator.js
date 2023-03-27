const joi = require("joi");
const Error = require("../errorFunction");

const validation = joi.object({
  cardNumber: joi.string().min(16).max(19).required(),
  expiryDate: joi.date().min(2022).max('1-1-2030').iso(),
   //joi.number().integer().min(2022).max(2030),
  cvv: joi.string().min(3).max(3).required(),
  // socialSecurityNumber: joi.string().min(9).max(9).required(),
  // drivingLicenceNumber: joi.string().min(8).max(8).required(),
  bankName: joi.string().min(3).max(25).trim(true).required(),
});

const cardValidation = async (req, res, next) => {
  const payload = {
    cardNumber: req.body.cardNumber,
    expiryDate: req.body.expiryDate,
    cvv: req.body.cvv,
    socialSecurityNumber: req.body.socialSecurityNumber,
    drivingLicenceNumber: req.body.drivingLicenceNumber,
    bankName: req.body.bankName,
  };

  const { error } = validation.validate(payload);
  if (error) {
    res.status(406);
    return res.json(Error(true, `Error in Card Data : ${error.message}`));
  } else {
    next();
  }
};

module.exports = cardValidation;
