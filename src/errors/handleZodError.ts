import { ZodError, ZodIssue } from 'zod';
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from '../interfaces/errors/genericError.interfaces';

const handleZodError = (err: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path.length - 1],
      message: issue?.message,
    };
  });

  return {
    statusCode: 400,
    message: 'Validation error',
    errorMessages: errors,
  };
};

export default handleZodError;
