import { z } from 'zod/v4';

const userValidationSchema = z.object({
  password: z
    .string({ error: 'Password Must be string' })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
});

export const UserValidations = {
  userValidationSchema,
};
