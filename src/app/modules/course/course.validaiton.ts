import { z } from 'zod/v4';

// PreRequisiteCourses Zod Schema
const preRequisiteCoursesZodSchema = z.object({
  course: z.string({
    error: 'Pre-requisite course ID is required',
  }),
  isDeleted: z.boolean().optional().default(false),
});

// Course Zod Schema
export const createCourseValidationSchema = z.object({
  title: z
    .string({
      error: 'Course title is required',
    })
    .trim(),

  prefix: z
    .string({
      error: 'Course prefix is required',
    })
    .trim(),

  code: z.number({
    error: 'Course code is required',
  }),

  credits: z.number({
    error: 'Course credits is required',
  }),

  preRequisiteCourses: z.array(preRequisiteCoursesZodSchema).optional(),
});

export const updateCourseValidationSchema = z.object({
  title: z
    .string({
      error: 'Course title is required',
    })
    .trim()
    .optional(),

  prefix: z
    .string({
      error: 'Course prefix is required',
    })
    .trim()
    .optional(),

  code: z
    .number({
      error: 'Course code is required',
    })
    .optional(),

  credits: z
    .number({
      error: 'Course credits is required',
    })
    .optional(),

  preRequisiteCourses: z.array(preRequisiteCoursesZodSchema).optional(),
});
