export class HttpException extends Error{
  constructor(message, errorCode, statusCode, errors){
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export const ErrorCode = {
  INTERNAL_ERROR: 1001,
  VALIDATION_FAILURE: 2001,
  DATA_NOT_FOUND: 3001,
  AUTH_FAILURE: 4001
}