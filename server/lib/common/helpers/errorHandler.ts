import { NextFunction } from "connect";
import ErrorHandler from "./../exceptions/error-handler.exception";

export function handleError(error: ErrorHandler, request, response, next: NextFunction) {
  console.log(`${error.status}: ${error.message}`)
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response.status(status).send({
    status,
    message,
  })
}
