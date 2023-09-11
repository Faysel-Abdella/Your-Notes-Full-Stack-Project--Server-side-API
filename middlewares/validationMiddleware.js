const { body, validationResult } = require("express-validator");

const { StatusCodes } = require("http-status-codes");

const User = require("../models/userModel");

const withValidatorErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      const errorArray = errors.array();
      if (!errors.isEmpty()) {
        const errorMessages = errorArray.map((error) => error.msg);
        const error = new Error(errorMessages);
        error.statusCode = StatusCodes.BAD_REQUEST;
        if (errorMessages[0].startsWith("no task")) {
          error.statusCode = StatusCodes.NOT_FOUND;
        }
        throw error;
      }
      next();
    },
  ];
};

exports.validateFirstSignup = withValidatorErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail()
    //check if there is a user with the same email
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email already exist, please use another email");
      }
    }),
  body("password")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("At least 5 characters password is required")
    .trim(),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("password should be match");
      }
      return true;
    }),
]);

exports.validateCompleteSignupInput = withValidatorErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail()
    //check if there is a user with the same email
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error(
          "email already exist, back to signup page and use a valid email"
        );
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters")
    .trim(),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("password should be match");
      }
      return true;
    }),
  body("username").notEmpty().withMessage("username is required"),
  body("phone").notEmpty().withMessage("Phone number is required").trim(),
  body("birthDayYear")
    .notEmpty()
    .withMessage("Birth  day year is required")
    .trim(),
]);

exports.validateLoginInput = withValidatorErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("password is required"),
]);

exports.validateUpdateUserInput = withValidatorErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail()
    //check if there is a user with the same email
    //check if there is a user with the same email
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });
      if (user && user._id.toString() !== req.userId) {
        throw new Error("email already exist");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters")
    .trim(),
  body("username").notEmpty().withMessage("username is required"),
  body("phone").notEmpty().withMessage("Phone number is required").trim(),
  body("birthDayYear")
    .notEmpty()
    .withMessage("Birth  day year is required")
    .trim(),
]);
