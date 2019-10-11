export class ErrorHandler extends Error {
  public statusCode;

  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (error, response, req) => {
  console.log('HANDLE ERROR')
  if (error.statusCode === 500) {
    // if (process.env.NODE_ENV == Environments.Production.toString()) {
        var obj = {
            message: error.message,
            name: error.name,
            stack: error.stack
        };
        // logger.log(obj);
        return response.status(error.statusCode).send('Internal Server Error!');
    // }
    // else {
    }
    return response.status(error.statusCode).send('error.message');
  }

  // const { statusCode, message } = error;
  // response.status(statusCode).json({
  //   status: "error",
  //   statusCode,
  //   message,
  // });
