import z from 'zod/v4';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ error: 'ID is required' }),
    password: z.string({ error: 'Password id required' }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
};
