const express = require("express");

const router = express.Router();

const {
  validateUpdateUserInput,
} = require("../middlewares/validationMiddleware");

const { getCurrentUser } = require("../controllers/userController");
const { checkUser } = require("../controllers/userController");
const { updateUser } = require("../controllers/userController");

router.post("/user/check-user", checkUser);

router.get("/user/current-user", getCurrentUser);

router.patch("/user/update-user", validateUpdateUserInput, updateUser);

module.exports = router;
