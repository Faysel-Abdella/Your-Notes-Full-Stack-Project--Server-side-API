const { StatusCodes } = require("http-status-codes");
const { verifyJWT } = require("../utils/tokenUtil");

exports.authenticateUser = (req, res, next) => {
  const token = req.headers.token;
  try {
    const { userId } = verifyJWT(token);

    //Attach the userId  to the req object for later use
    req.user = { userId };

    next();
  } catch (err) {
    const error = new Error("unauthenticated error");
    error.statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }
};
