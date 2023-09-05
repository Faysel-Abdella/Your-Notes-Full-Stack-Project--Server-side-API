const { StatusCodes } = require("http-status-codes");

const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

exports.checkUser = async (req, res, next) => {
  const token = req.body.token;
  res.status(200).json({ message: "good" });
  console.log("this is the token to check user", req.body.token);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const userId = decoded.userId;

  // Attach the userId to the req object
  req.userId = userId;

  console.log("this is the attached", req.userId);
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    const userWithOutPassword = user.withOutPassword();
    res.status(StatusCodes.OK).json({ user: userWithOutPassword });
  } catch (err) {
    const error = new Error("Can't find current user");
    throw error;
  }
};

exports.updateUser = async (req, res, next) => {
  const newUser = { ...req.body };

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  res.status(StatusCodes.OK).json({ message: "user updated" });
};
