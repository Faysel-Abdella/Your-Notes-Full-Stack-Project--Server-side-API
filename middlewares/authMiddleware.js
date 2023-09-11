const { StatusCodes } = require("http-status-codes");
const { verifyJWT } = require("../utils/tokenUtil");

exports.authenticateUser = (req, res, next) => {
  // ** Step 1: Check if token cookie exist from incoming request cookies,
  //    if it does't exist response unauthenticated error

  const { token } = req.body.token;
  if (!token) {
    const error = new Error("unauthenticated error, token does't exist");
    error.statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }

  // ** Step 2: If the  token cookie exist from incoming request cookies,
  //     verify whether the JWT is valid and if it is valid, grab the userID and role

  try {
    const { id } = decode(token);
    //Attach the userId and role to the req object for later use

    req.user = { userId: id };
    //the same as saying req { user: {userId, role} }

    next();
  } catch (err) {
    const error = new Error("unauthenticated error");
    error.statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }
};
