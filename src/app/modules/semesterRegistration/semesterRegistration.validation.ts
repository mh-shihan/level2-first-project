import { z } from 'zod/v4';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';
import { dateTime } from '../../constants/validation.constant';

// When Create
const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum([...SemesterRegistrationStatus]),
    startDate: dateTime,
    endDate: dateTime,
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});

// When Update
const updateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z.enum([...SemesterRegistrationStatus]).optional(),
    startDate: dateTime.optional(),
    endDate: dateTime.optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});

export const SemesterRegistrationValidations = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
};
