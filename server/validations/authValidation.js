const Joi = require("joi");

// Define Joi schema for user validation
const userValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = userValidationSchema;
