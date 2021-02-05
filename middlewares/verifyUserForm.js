const { body, validationResult } = require("express-validator");
/////////////////////////////////////////
//-----USER VERIFY MIDDLEWARE------
module.exports.UserVerify = [
  body("name").not().isEmpty().withMessage("NAME IS MISSING"),
  body("email").not().isEmpty().isEmail().withMessage("EMAIL IS INVALID"),
  body("phone")
    .isLength({ min: 10, max: 10 })
    .withMessage("INVALID PHONE NUMBER"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("PASSWORD MUST BE OF 8 DIGIT"),
];

//----USER LOGIN VALIDATE-----
module.exports.Login = [
  body("email").not().isEmpty().isEmail().withMessage("Email is incorrect"),
  body("password").not().isEmpty().withMessage("Password cannot be empty"),
];
///////////////////////////////////////////
