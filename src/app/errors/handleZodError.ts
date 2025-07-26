import { ZodError } from 'zod/v4';
import { TZodValidationError } from '../interface/error';

const handleZodError = (err: ZodError) => {
  const parsedErrors = JSON.parse(err.message);

  const errors: TZodValidationError[] = parsedErrors;

  const errorSources = errors.map((error) => {
    return {
      path: error?.path[error?.path?.length - 1],
      message: error.message,
    };
  });
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;
