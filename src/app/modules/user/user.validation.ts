import { z } from 'zod/v4';

const roleEnum = z.enum(['admin', 'student', 'faculty']);
const statusEnum = z.enum(['in-progress', 'blocked']);

const userValidationSchema = z.object({
  id: z.string(),
  password: z
    .string()
    .max(20, { message: 'Password can not be more than 20 characters' }),
  needsPasswordChange: z.boolean().optional().default(true),
  role: roleEnum,
  stats: statusEnum.default('in-progress'),
  isDeleted: z.boolean().optional().default(false),
});

export const UserValidation = {
  userValidationSchema,
};
