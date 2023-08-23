exports.attachEmailToReq = (req, res, next) => {
  const email = req.body.email;
  req.email = email;
  next();
};
