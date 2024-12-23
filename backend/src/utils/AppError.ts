class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(
    message: string,
    statusCode: number,
    isOperational = true,
    stack = ""
  ) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = AppError;
