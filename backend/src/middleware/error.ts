import { Request, Response, NextFunction } from 'express';
const httpStatus = require('http-status');
// eslint-disable-next-line
const AppError = require('../utils/AppError');
const config = require('config');

const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = err;

  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (!(error instanceof AppError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new AppError(message, statusCode, false, err.stack);
  }
  next(error);
};

const handleDuplicateFieldsDB = (err: any) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const field = Object.keys(err.keyValue)[0];
  const message = `Duplicate field: ${field} value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err;
  if (config.get('NODE_ENV') === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    status: statusCode,
    message,
    ...(config.get('NODE_ENV') === 'development' && {
      stack: err.stack
    })
  };

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler
};
