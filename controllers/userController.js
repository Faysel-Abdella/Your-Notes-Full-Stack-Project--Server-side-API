const { StatusCodes } = require("http-status-codes");
const User = require("../models/userModel");

exports.getCurrentUser = async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithOutPassword = user.withOutPassword();
  res.status(StatusCodes.OK).json({ user: userWithOutPassword });
};

exports.updateUser = async (req, res, next) => {
  const newUser = { ...req.body };

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  res.status(StatusCodes.OK).json({ message: "user updated" });
};
