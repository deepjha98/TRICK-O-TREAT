require("dotenv").config();
const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcrypt"),
  JWT = require("jsonwebtoken");

const { validationResult } = require("express-validator");

var User = require("../models/user"),
  { UserVerify, Login } = require("../middlewares/verifyUserForm");
////////////////////////////////////////////////
//HOME PAGE ROUTE
router.get("/", (req, res) => {
  res.send("HELLO THIS THE PAGE");
});

//API FOR REGISTER NEW USER
router.post("/register", UserVerify, (req, res) => {
  var { name, email, phone, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //EMAIL ALREADY EXISTS
  User.findOne({ email }, (err, foundEmail) => {
    if (foundEmail) {
      return res
        .status(400)
        .json({ errors: [{ msg: "EMAIL ALREADY EXISTS" }] });
    }
    //PHONE ALREADY EXISTS
    User.findOne({ phone }, async (err, foundPhone) => {
      if (foundPhone) {
        return res
          .status(400)
          .json({ errors: [{ msg: "PHONE ALREADY EXISTS" }] });
      }
      //GENERATING HASH OF FUNCTION
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const newUser = {
        name,
        email,
        password: hash,
        phone,
      };
      //CREATING A NEW USER IN DATABASE
      const user = User.create(newUser, (err, createdUser) => {
        if (err) {
          return res.status(500).json({ errors: err.message });
        }
        const token = createToken(createdUser);
        return res
          .status(200)
          .json({ msg: "YOUR ACCOUNT HAS BEEN CREATED", token });
      });
      // CREATING A TOKEN FOR THE USER
      // BY CALLING IT
    });
  });
});

//ROUTE FOR LOGIN
router.post("/login", Login, (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //USER ID FETCH FROM GIVEN EMAIL
  User.findOne({ email: email }, async (err, foundUser) => {
    if (err) {
      return res.send(err.message);
    } else if (foundUser) {
      /*
      IF FOUND USER THEN WE APPLY ALL THE VERIFICATION 
      AND COMPARE WITH ALREADY EXISTING HASH
      ---------------------------------------
    */
      const matched = await bcrypt.compare(password, foundUser.password);
      //IF MATCHED IS TRUE THAT MEANS USER VERIFIED
      if (matched) {
        const token = createToken(foundUser);
        return res.status(200).json({ msg: "SUCCESFULLY LOGGED IN", token });
      }
      return res
        .status(401)
        .json({ errors: [{ msg: "YOU HAVE ENTERED INVALID CREDENTIALS" }] });
      //------------------------------------------
    } else {
      return res.status(404).json({ errors: [{ msg: "Email not found" }] });
    }
  });
});
////////////////////////////////////////////////
module.exports = router;

//--RESUSABLE FUNCTIONS------
//To generate tokkens
const createToken = (user) => {
  return JWT.sign({ user }, process.env.SECRET, {
    expiresIn: "2d",
  });
};
//---------------------------
