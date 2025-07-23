import { z } from 'zod/v4';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({ error: 'Academic Department  must be string' }),
    academicFaculty: z.string({ error: 'Academic Department  is required' }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({ error: 'Academic Department  must be string' }).optional(),
    academicFaculty: z
      .string({ error: 'Academic Department  is required' })
      .optional(),
  }),
});

export const AcademicDepartmentValidations = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
