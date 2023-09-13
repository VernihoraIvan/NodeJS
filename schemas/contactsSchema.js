const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  number: Joi.number().required(),
});

module.exports = addContactSchema;
