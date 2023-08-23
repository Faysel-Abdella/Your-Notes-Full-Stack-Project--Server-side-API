const { StatusCodes } = require("http-status-codes");

const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

// const { hashPassword } = require("../utils/hashPassword");

exports.completeSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const phone = req.body.phone;
  const birthDayYear = req.body.birthDayYear;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
    username,
    phone,
    birthDayYear,
  });
  await user.save();

  res.status(StatusCodes.CREATED).json({ message: "User created" });
};
