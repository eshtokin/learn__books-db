import ErrorHandler from "./error-handler.exception";

export default class UnauthorizedException extends ErrorHandler {
  constructor(message: string) {
    super(401, message)
  }
}