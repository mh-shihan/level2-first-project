import { z } from 'zod/v4';
import {
  Days,
  invalidTimeFormat,
  isValid24HourTime,
} from './offeredCourse.constant';

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      section: z.number(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days])),
      startTime: z
        .string()
        .refine(isValid24HourTime, { message: invalidTimeFormat }), // HH: MM   00-23: 00-59
      endTime: z
        .string()
        .refine(isValid24HourTime, { message: invalidTimeFormat }),
    })
    .refine(
      ({ startTime, endTime }) => {
        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);
        return end > start;
      },
      {
        message: 'Start time should be before End time!',
      },
    ),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string(),
    maxCapacity: z.number(),
    days: z.array(z.enum([...Days])),
    startTime: z.string(), // HH: MM   00-23: 00-59
    endTime: z.string(),
  }),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
