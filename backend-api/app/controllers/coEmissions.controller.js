const async = require('async');
const cheerio = require('cheerio');
const states = require('us-state-codes');
const axios = require('axios');
const CircularJSON = require('circular-json');

const logger = require('../services/logger.service');
const errorMessages = require('../constants/errorMessages');
const configs = require('../constants/configs');
const coEmissionsService = require('../services/coEmissions.service');

function getCoEmissionQuanityURLByState(data, state) {
  if (!data || data.length === 0)
    return null;
  if (!state)
    return null;
  let stateName = states.sanitizeStateName(state);
  let stateCode = states.getStateCodeByStateName(stateName);
  let regex = new RegExp('\\?category\\=\\d*\\w*\\&\\w*\\=\\w*\\.\\w*-\\w*-\\w*-\\w*-' + stateCode + '\\.A');
  data = regex.exec(data);
  return data[0];
}

function getCoEmissionQuanityByYear(data, year) {
  if (!data || data.length === 0)
    return null;
  if (!year)
    return null;

  let regex = new RegExp('\\[Date.UTC\\(' + year + '.*?\\]');
  data = regex.exec(data);
  return data.join().split(',').pop().replace(/[\[\]']+/g,'');
}

const getStringDataFromURL = async(url) => {
  if (!url || url.length === 0)
    return null;
  let data;
  try {
    data = await axios.get(url);
  }
  catch (e) {
    return null;
  }
  let parsedData = stringifyCircularJSON(data);
  return parsedData;
}

function stringifyCircularJSON(data) {
  let parsedData = CircularJSON.stringify(data);
  return JSON.stringify(parsedData);
}

const getCoEmissionDataAtYear = async(url, state, year) => {
  if (!url || url.length === 0)
    return null;
  if (!year)
    return null;
  if (!state)
    return null;
  let data;
  try {
    let siteURL = decodeURI(url);
    const siteData = await getStringDataFromURL(siteURL);
    if (!siteData)
      throw { code: 500, message: errorMessages.ERROR_INTERNAL_SERVER };
    let parsedURLData = getCoEmissionQuanityURLByState(siteData, state);
    if (!parsedURLData)
      throw { code: 500, message: errorMessages.ERROR_INTERNAL_SERVER };
    let subSiteURL = siteURL.replace(new RegExp('\\?category\\=\\d*'), parsedURLData);
    const subSiteData = await getStringDataFromURL(subSiteURL);
    if (!subSiteData)
      throw { code: 500, message: errorMessages.ERROR_INTERNAL_SERVER };
    let resultData = getCoEmissionQuanityByYear(subSiteData, year);
    if (!resultData)
      throw { code: 500, message: errorMessages.ERROR_INTERNAL_SERVER };
    return { state: state, year: year, value:resultData };
  }
  catch (e) {
    throw { code: 500, message: errorMessages.ERROR_INTERNAL_SERVER };
  }
}

//==============================================================================
// Task: 1
// ROUTE: http://localhost:3000/data
// PRE-CONDITION:
//    @params state   String
//    @params year    Number
// POST-CONDITION:
//    "year":2000,
//    "state":"California",
//    Result: 2.103701
const getData = async(req, res) => {
  try {
    let result = await getCoEmissionDataAtYear(configs.TESTING_SITE_URL, req.query.state, req.query.year);
    await coEmissionsService.saveData(result.state, result.year, result.value);
    return res.status(200).json(result);
  }
  catch (e) {
    return res.status(500).json({ message: errorMessages.ERROR_INTERNAL_SERVER });
  }
};
//==============================================================================

//==============================================================================
// Task: 2
// ROUTE: http://localhost:3000/data/range
// PRE-CONDITION:
//    @params state   String
//    @params from    Number
//    @params to    Number
// POST-CONDITION:
//    "from":2003,
//    "to":2006,
//    "state":"California",
//    Result: 8.306344
const getDataRange = async(req, res) => {
  let from = req.query.from;
  let to = req.query.to;
  if ((to - from) > configs.GET_DATA_MAX_RANGE) {
    return res.status(500).json({ message: errorMessages.ERROR_INTERNAL_SERVER });
  }
  let result = 0;
  let count = to - from;
  for (let i = from; i <= to; i++) {
    try {
      let temp = await getCoEmissionDataAtYear(configs.TESTING_SITE_URL, req.query.state, i);
      result += parseFloat(temp);
    }
    catch (e) {
      return res.status(500).json({ message: errorMessages.ERROR_INTERNAL_SERVER });
    }
  }
  return res.status(200).json({ result });
};
//==============================================================================

//==============================================================================
// Task: Bonus
// ROUTE: http://localhost:3000/data/range/highest
// PRE-CONDITION:
//    @params from    Number
//    @params to      Number
// POST-CONDITION:
//    "state":"California",
//    Result: Returns the highest rate occured state in range.
const getHighestDataRange = async(req, res) => {
  let from = req.query.from;
  let to = req.query.to;
  if ((to - from) > configs.GET_DATA_MAX_RANGE) {
    return res.status(500).json({ message: errorMessages.ERROR_INTERNAL_SERVER });
  }
  let result;
  try {
    result = await coEmissionsService.getHighestDataRange(from, to);
  }
  catch (e) {
    return res.status(500).json({ message: errorMessages.ERROR_INTERNAL_SERVER });
  }
  return res.status(200).json({ result });
};
//==============================================================================

module.exports = {
  getData,
  getDataRange,
  getHighestDataRange
};
