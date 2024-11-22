const joi = require("joi");

const validForm = (req, res, next) => {
  const schema = joi.object({
    // username: joi.string().min(3).max(10).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
    // confirm_password: joi.any().valid(joi.ref("password")).required().messages({
    //   "any.only": "Passwords do not match",
    // }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    // Send a response with the error message and stop further processing
    return res.status(400).json({
      message: error.details[0].message.replace(/\"/g, " "),
    });
  }

  // If there is no error, pass control to the next middleware
  next();
};
const validRegisterForm = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(3).max(10).required(),
    email: joi.string().email().required(),
    role: joi.string().required(),
    password: joi.string().min(4).required(),
    confirm_password: joi.any().valid(joi.ref("password")).required().messages({
      "any.only": "Passwords do not match",
    }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message.replace(/\"/g, " "),
    });
  }

  next();
};

module.exports = { validForm, validRegisterForm };
