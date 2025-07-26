export type TErrorSource = {
  path: string | number;
  message: string;
}[];

export type TZodValidationError = {
  code: string;
  path: string[];
  message: string;
  values?: string[];
};
