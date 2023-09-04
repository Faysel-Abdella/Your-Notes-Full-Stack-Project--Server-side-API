const { StatusCodes } = require("http-status-codes");

const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

exports.checkUser = async (req, res, next) => {
  const token = req.body.token;
  res.status(200).json({ message: "good" });
  console.log("this is the token to check user", req.body.token);

  // if (!token) {
  // const error = new Error("unauthenticated error, token does't exist");
  // error.statusCode = StatusCodes.UNAUTHORIZED;
  // throw error;
  // }

  // ** Step 2: If the  token cookie exist from incoming request cookies,
  //     verify whether the JWT is valid and if it is valid, grab the userID and role

  // try {
  //   const { id } = jwt.decode(token);
  //   console.log("This is the id", id);
  //   //Attach the userId and role to the req object for later use

  //   req.user = { userId: id };
  //   //the same as saying req { user: {userId, role} }
  //   res.status(StatusCodes.OK).json({ message: "user exist" });
  // } catch (err) {
  //   const error = new Error(
  //     "unauthenticated error, error while verifying the token"
  //   );
  //   error.statusCode = StatusCodes.UNAUTHORIZED;
  //   throw error;
  // }
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
