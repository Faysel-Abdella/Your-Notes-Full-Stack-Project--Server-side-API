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
  // console.log("This is the header in req", body.headers);
  // const token = req.body.token || req.headers.authorization;
  const token = req.body.token;

  console.log(
    "This is the request body in verifyJWT when adding a task",
    req.body
  );
  console.log(
    "This is the request token in verifyJWT when adding a task",
    req.body.token
  );

  if (!token) {
    const error = new Error("unauthenticated error, token does't exist");
    error.statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    console.log("Attached userId in verifyJWT middleware", req.userId);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
