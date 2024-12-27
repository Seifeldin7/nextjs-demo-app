import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
// eslint-disable-next-line
const AppError = require("../utils/AppError");
dotenv.config();

const INTERNAL_SERVER_ERROR = 500;

const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;

  if (error.code === 'ENOENT') error = handleENOENTError();
  if (!(error instanceof AppError)) {
    const statusCode = error.statusCode || INTERNAL_SERVER_ERROR;
    const message = error.message;
    error = new AppError(message, statusCode, false, err.stack);
  }
  next(error);
};

const handleENOENTError = () => {
  return new AppError('File Does Not exist', 404);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    status: statusCode,
    message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  };

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
