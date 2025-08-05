import { z } from 'zod/v4';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum([...SemesterRegistrationStatus]),
    startDate: z.date({
      error: (issue) =>
        issue.input === undefined ? 'Required' : 'Invalid date',
    }),
    endDate: z.date({
      error: (issue) =>
        issue.input === undefined ? 'Required' : 'Invalid date',
    }),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});

export const SemesterRegistrationValidations = {
  createSemesterRegistrationValidationSchema,
};
