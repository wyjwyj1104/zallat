const winston = require('winston');

const { combine, timestamp, errors, prettyPrint, colorize } = winston.format;

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
        format: combine(
          errors({ stack: true }),
          timestamp(),
          colorize(),
          prettyPrint(),
        ),
        level: 'debug',
        handleExceptions: true,
        json: true,
        humanReadableUnhandledException: true
    }),
  ]
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
