const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
};

module.exports = {
  getData: [...require('./coEmissions/get-data.validator'), validate],
  getDataRange: [...require('./coEmissions/get-data-range.validator'), validate],
  getHighestDataRange: [...require('./coEmissions/get-highest-data-range.validator'), validate],
};
