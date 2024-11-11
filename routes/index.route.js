const { Router } = require("express");
const router = Router();
const indexController = require("../src/controllers/index.controller");
const { validForm } = require("../src/middleware/validations/form.validation");

router.post("/", validForm, indexController.testValidateWithJoi);

module.exports = router;
