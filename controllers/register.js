const Register = require('../models/register');
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AWS = require('aws-sdk');
let customerID;

exports.subToken = async (req, res, next) => {

  console.log("testing token", req.body["x-amzn-marketplace-token"]);
 
  //return res.status(200).json({ success: true, CustomerIdentifier: "data.CustomerIdentifier", message: 'working' });

  AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'AKIA4MPQDEZ4E7PMNZJ2',
    secretAccessKey: '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',
  });
  
  var marketplacemetering = new AWS.MarketplaceMetering();
  marketplacemetering.resolveCustomer({
    RegistrationToken:  req.body["x-amzn-marketplace-token"] // TODO replace with token from POST request
  }, (err, data) => {
    if (err) {
      if (err.code === 'InvalidTokenException') {
        return res.status(422).json({ success: false, error: err, message: 'Invalid token' });
      } else {
       throw err;
      }
    } else {
        console.log("CustomerIdentifier", data.CustomerIdentifier)
        customerID = data.CustomerIdentifier
        return res.status(200).json({ success: true, ProductCode: data.ProductCode, CustomerIdentifier: data.CustomerIdentifier, message: 'working' });
     
    }
  });
}

exports.registerCustomer = async (req, res, next) => {
    const errors = [];

    if (!validator.isEmail(req.body.email)) {
      errors.push({ message: "E-mail is invalid." });
    }
    if (
      validator.isEmpty(req.body.password) ||
      !validator.isLength(req.body.password, { min: 6 })
    ) {
      errors.push({ message: "Password Too Short!" });
    }
    if (
        validator.isEmpty(req.body.phoneNo) ||
        !validator.isLength(req.body.phoneNo, { min: 10 })
      ) {
        errors.push({ message: "Phone NUmber Invalid!" });
      }
    if (errors.length > 0) {
        return res.status(422).json({ success: false, error: errors, message: 'Invalid input' });
    }
    const existingUser = await Register.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(201).json({ success: false, message: 'Customer already exists' });
    }
    const hashedPw = await bcrypt.hash(req.body.password, 10);
    const user = new Register({
      token: req.body.token,
      customerID: customerID, 
      email: req.body.email,
      phoneNo: req.body.phoneNo,
      password: hashedPw,
    });
    try{
        const createUser = await user.save();
    }catch (error) {
        return res.status(400).json({ error: true, message: 'error occured in Customer registeration' });
    }
    return res.status(200).json({ success: true, message: 'Customer registered successfully ', email: req.body.email, phoneNo: req.body.phoneNo, token: token });
};
exports.registerView = function (req, res) {
  res.render('register');
}

exports.loginCustomer = async (req, res, next) => {
  const user = await Register.findOne({ email: req.body.email });
  if (!user) {
    return res.status(422).json({ success: false, message: 'User not found' });
  }
  const isEqual = await bcrypt.compare(req.body.password, user.password);
  if (!isEqual) {
    return res.status(422).json({ success: false, message: 'Password invalid' });
  }
  const token = await jwt.sign(
    { userId: user._id.toString(), email: user.email },
    config.secret,
    { expiresIn: "1h" }
  );
  return res.status(200).json({ success: true, token: token, userId: user._id.toString(), expiresIn: 3600 });
}

