import { NextFunction } from "connect";

export class ErrorHandler extends Error {
  public status;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }
}

export function handleError(error: ErrorHandler, request, response, next: NextFunction) {
  console.log('HANDLE ERROR')
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response.status(status).send({
    status,
    message,
  })
}
