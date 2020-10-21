const { query } = require('express-validator');

const validateGetDataRange = [
  query('from').exists().isNumeric(),
  query('to').exists().isNumeric().custom((to, { req }) => {
    if (to < req.query.from) {
      throw new Error('Range invalid');
    }
    return true;
  }),
  query('state').exists().isString(),
];

module.exports = validateGetDataRange;
