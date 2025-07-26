export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TZodValidationError = {
  code: string;
  path: string[];
  message: string;
  values?: string[];
};

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
