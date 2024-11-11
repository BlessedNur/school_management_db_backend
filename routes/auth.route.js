const { Router } = require("express");
const router = Router();
const indexController = require("../src/controllers/index.controller");
const { validForm } = require("../src/middleware/validations/form.validation");
const authController = require("../src/controllers/auth.controller");
const authMiddleware = require("../src/middleware/auth.middleware");

router.post(
  "/login",
  // authMiddleware.isLogin,
  authMiddleware.IsAdmin,
  validForm,
  authController.login
);

module.exports = router;
