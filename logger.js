const winston = require('winston') // Libreria para logs

exports.logger= winston.createLogger({
    level: 'debug',
    transports: [
      new winston.transports.Console(),
     // new winston.transports.File({ filename: 'combined.log' })
    ]
  });
