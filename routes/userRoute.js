const express = require("express");

const router = express.Router();

const { verifyJWT } = require("../utils/tokenUtil");

const {
  validateUpdateUserInput,
} = require("../middlewares/validationMiddleware");

const { getCurrentUser } = require("../controllers/userController");
const { checkUser } = require("../controllers/userController");
const { updateUser } = require("../controllers/userController");

router.post("/user/check-user", verifyJWT, checkUser);

router.post("/user/current-user", verifyJWT, getCurrentUser);

router.patch(
  "/user/update-user",
  verifyJWT,
  validateUpdateUserInput,
  updateUser
);

module.exports = router;
