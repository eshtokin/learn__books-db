import HttpException from './http.exception';

class PostNotFoundException extends HttpException {
  constructor(message: string) {
    super(404, message);
  }
}

export default PostNotFoundException;
