import { ErrorRequestHandler } from 'express';
import envConfig from '../../config/envConfig';
import handleValidationError from '../../errors/handleValidationError';
import { IGenericErrorMessage } from '../../interfaces/errors/genericError.interfaces';
import ApiError from '../../errors/ApiError';
import { errorLogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import handleCastError from '../../errors/handleCastError';

const envBasedLogger = (error: any) => {
  // eslint-disable-next-line
  envConfig.node_env === 'development'
    ? // eslint-disable-next-line no-console
      console.log('Global Error Handler', error)
    : errorLogger.error('Global error handler', error);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  envBasedLogger(err);
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMessage[] = [];

  if (err?.name === 'ValidationError') {
    const error = handleValidationError(err);
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = error.errorMessages;
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof ZodError) {
    const error = handleZodError(err);
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = error.errorMessages;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: envConfig.node_env !== 'production' ? err?.stack : undefined,
  });
};

export default globalErrorHandler;
