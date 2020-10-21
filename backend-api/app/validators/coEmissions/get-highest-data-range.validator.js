const { query } = require('express-validator');

const validateGetHighestDataRange = [
  query('from').exists().isNumeric(),
  query('to').exists().isNumeric().custom((to, { req }) => {
    if (to < req.query.from) {
      throw new Error('Range invalid');
    }
    return true;
  }),
];

module.exports = validateGetHighestDataRange;
