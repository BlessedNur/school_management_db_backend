const { Router } = require("express");
const router = Router();
const indexController = require("../src/controllers/index.controller");
const {
  validForm,
  validRegisterForm,
} = require("../src/middleware/validations/form.validation");
const authController = require("../src/controllers/auth.controller");
const authMiddleware = require("../src/middleware/auth.middleware");

router.post(
  "/login",
  validForm,
  authController.login
);

router.post("/register", validRegisterForm, authController.register);

module.exports = router;
