import { z } from 'zod/v4';

const academicFacultyValidationSchema = z.object({
  password: z.string({ error: 'Academic Faculty  must be string' }),
});

export const AcademicFacultyValidations = {
  academicFacultyValidationSchema,
};
