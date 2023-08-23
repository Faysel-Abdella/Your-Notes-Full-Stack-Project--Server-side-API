const { StatusCodes } = require("http-status-codes");

const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

// const { hashPassword } = require("../utils/hashPassword");

exports.signup = async (req, res, next) => {
  const email = await req.body.email;
  const password = await req.body.password;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
  });
  await user.save();

  res.status(StatusCodes.CREATED).json({ message: "User created" });
};
