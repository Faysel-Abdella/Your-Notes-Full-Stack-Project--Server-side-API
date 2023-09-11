const { StatusCodes } = require("http-status-codes");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

exports.checkUser = async (req, res, next) => {
  const token = req.body.token;
  res.status(200).json({ message: "good" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const userId = decoded.userId;

  // Attach the userId to the req object
  req.userId = userId;
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    const userWithOutPassword = user.withOutPassword();
    res.status(StatusCodes.OK).json({ user: userWithOutPassword });
  } catch (err) {
    const error = new Error("Can't find current user", err);
    throw error;
  }
};

exports.updateUser = async (req, res, next) => {
  const newUser = { ...req.body };
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);

  newUser.password = hashedPassword;

  const updatedUser = await User.findByIdAndUpdate(req.userId, newUser);

  res.status(StatusCodes.OK).json({ message: "user updated" });
};
