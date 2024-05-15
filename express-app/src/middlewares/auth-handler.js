import { AUTH_TOKEN } from "../../config/index.js";
import { ErrorCode, HttpException } from "../exceptions/http-exception.js";

export const authRequest = (req, res, next) => {
  try {
    if(req.headers['x-auth-token'] != AUTH_TOKEN){
      throw new HttpException('You are not authorised to perform this', ErrorCode.AUTH_FAILURE, 500);
    }

    next();
  } catch (error) {
    next(error);
  }
};