import ErrorHandler from "./error-handler.exception";

export default class BadRequest extends ErrorHandler {
  constructor(message: string) {
    super(400, message)
  }
}