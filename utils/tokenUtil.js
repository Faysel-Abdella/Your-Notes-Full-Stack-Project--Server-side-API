const { StatusCodes } = require("http-status-codes");

const jwt = require("jsonwebtoken");

exports.createJWT = (payload) => {
  //payload is a data to be part of our JWT

  //Generate a token
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

exports.verifyJWT = (req, res, next) => {
  const token = req.body.token;

  // console.log("This is the token when verifying", token);

  if (!token) {
    const error = new Error("unauthenticated error, token does't exist");
    error.statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
