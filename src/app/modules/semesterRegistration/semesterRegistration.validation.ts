import { z } from 'zod/v4';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({}),
});

export const SemesterRegistrationValidations = {
  createSemesterRegistrationValidationSchema,
};
