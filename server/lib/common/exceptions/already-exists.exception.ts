import HttpException from './http.exception';

class AlreadyExistsException extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}

export default UserWithThatEmailAlreadyExistsException;
