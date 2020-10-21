const { query } = require('express-validator');

const validateGetData = [
  query('year').exists().isNumeric(),
  query('state').exists().isString(),
];

module.exports = validateGetData;
