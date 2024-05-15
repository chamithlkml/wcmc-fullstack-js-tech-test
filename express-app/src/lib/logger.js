import winston from 'winston'

class Logger {
  constructor(){
    if(!Logger.instance){
      Logger.instance = this;

      this.logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
          new winston.transports.File({ filename: '/app/log/error.log', level: 'error' }),
          new winston.transports.File({ filename: '/app/log/combined.log' }),
        ],
      });

    }

    return Logger.instance;
  }

  static getInstance(){
    return new Logger();
  }

  info(message){
    this.logger.info(message);
  }

  error(message){
    this.logger.error(message);
  }

}

export default Logger;