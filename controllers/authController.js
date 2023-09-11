const { StatusCodes } = require("http-status-codes");

const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

const { createJWT } = require("../utils/tokenUtil");

// const { hashPassword } = require("../utils/hashPassword");

exports.firstSignup = (req, res, next) => {
  res.status(StatusCodes.CREATED).json({ message: "First signup step passed" });
};

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

  const token = user.createJWT();

  console.log("This is token when generating in singup", token);

  res
    .status(StatusCodes.CREATED)
    .json({ message: "User created", token: token });
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("No user found");
      error.statusCode = StatusCodes.BAD_REQUEST;

      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const error = new Error("Incorrect password");
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }

    // ### After the user passes all the above validation, now create a token for him and set up this token in his cookie

    const token = user.createJWT();

    console.log("This is token when generating in login", token);

    res
      .status(StatusCodes.OK)
      .json({ message: "user logged in", token: token });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.logout = (req, res) => {
  // //i will set a d/t value for the cookie of the same name the user logged in
  // res.cookie("token", "logout", {
  //   //and make this to be expires now
  //   expires: new Date(Date.now()),
  // });
  // res.status(StatusCodes.OK).json({ message: "user logged out" });
};
