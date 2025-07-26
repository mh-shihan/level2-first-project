import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err): TGenericErrorResponse => {
  const path: string[] = Object.keys(err?.keyValue);

  // Extract value within double quotes using regex
  const match = err?.errorResponse?.errmsg.match(/"([^"]*)"/);
  //   The Extracted value will be the first capturing group
  const extractMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: path[0],
      message: `${extractMessage} is already exists!`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Duplicate Key Error',
    errorSources,
  };
};
export default handleDuplicateError;
