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
  INTERNAL_ERROR: 1001
}