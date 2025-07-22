import { z } from 'zod/v4';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName]),
    year: z.string(),
    code: z.enum([...AcademicSemesterCode]),
    startMonth: z.enum([...Months]),
    endMonth: z.enum([...Months]),
  }),
});

export const AcademicSemesterValidations = {
  createAcademicSemesterValidationSchema,
};
