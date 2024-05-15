import { HttpException } from "./http-exception.js";

export class ValidationException extends HttpException {
  constructor(message, errorCode, statusCode, error = 'Internal Server Error'){
    super(message, errorCode, statusCode, [error])
  }
}