import { z } from 'zod/v4';

const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({ error: 'Academic Faculty  must be string' }),
  }),
});

const updateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({ error: 'Academic Faculty  must be string' }),
  }),
});

export const AcademicFacultyValidations = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
};
