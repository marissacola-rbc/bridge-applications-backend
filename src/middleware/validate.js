const { validationResult } = require('express-validator/check');
const { ValidationError } = require('../utils/errors');

const validate = (req, res, next) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw new ValidationError({ errors: validationErrors.array() });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { validate };
