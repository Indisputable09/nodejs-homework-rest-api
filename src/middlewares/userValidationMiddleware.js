const Joi = require('joi');
const { ValidationError } = require('../helpers/errors');

const handleValidationError = (validationResult, res, next) => {
  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message));
    // throw new ValidationError(validationResult.error.details[0].message);
  }
};

module.exports = {
  registerUserValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .required(),
      password: Joi.string().min(6).max(30).required(),
      subscription: Joi.string(),
      token: Joi.string(),
    });

    const validation = schema.validate(req.body);

    if (validation.error) {
      handleValidationError(validation, res, next);
    }
    next();
  },
  loginUserValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .required(),
      password: Joi.string().min(6).max(30).required(),
    });

    const validation = schema.validate(req.body);

    if (validation.error) {
      handleValidationError(validation, res, next);
    }

    next();
  },
};
