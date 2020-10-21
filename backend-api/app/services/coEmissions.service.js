const logger = require("./logger.service");
const errorMessages = require('../constants/errorMessages.js');
const CoEmission = require('../models/coEmission');

const saveData = async (state, year, value) => {
  try {
    return await CoEmission.findOneAndUpdate({ state: state, year: year }, { state: state, year: year, value: value }, { new: true, upsert: true});
  } catch (e) {
    logger.error('Error creating CO emission data', e);
    throw { code: 500, message: { message: errorMessages.ERROR_INTERNAL_SERVER } }
  }
};

const getHighestDataRange = async (from, to) => {
  try {
    const result = await CoEmission.find({}).
      where('year').gte(from).lte(to).
      sort('-value').
      limit(1).
      lean();
    return result[0];
  } catch (e) {
    logger.error('Error retrieving highest CO emission state', e);
    throw { code: 500, message: { message: errorMessages.ERROR_INTERNAL_SERVER } }
  }
};

module.exports = {
  saveData,
  getHighestDataRange,
};
