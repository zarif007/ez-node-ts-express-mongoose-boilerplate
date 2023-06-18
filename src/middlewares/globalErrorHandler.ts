import { NextFunction, Request, Response } from 'express'
import envConfig from '../config/envConfig'
import handleValidationError from '../errors/handleValidationError'
import { IGenericErrorMessage } from '../interfaces/errors/genericError.interfaces'
import ApiError from '../errors/ApiError'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const error = handleValidationError(err)
    statusCode = error.statusCode
    message = error.message
    errorMessages = error.errorMessages
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: envConfig.node_env !== 'production' ? err?.stack : undefined,
  })

  next()
}

export default globalErrorHandler
