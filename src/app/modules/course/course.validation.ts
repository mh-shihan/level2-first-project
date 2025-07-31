import { z } from 'zod/v4';

// PreRequisiteCourses Zod Schema
const createPreRequisiteCoursesZodSchema = z.object({
  course: z.string({
    error: 'Pre-requisite course ID is required',
  }),
  isDeleted: z.boolean().optional().default(false),
});

const updatePreRequisiteCoursesZodSchema = z.object({
  course: z.string({
    error: 'Pre-requisite course ID is required',
  }),
  isDeleted: z.boolean().optional().default(false),
});

// Course Zod Schema
const createCourseValidationSchema = z.object({
  body: z.object({
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

    preRequisiteCourses: z.array(createPreRequisiteCoursesZodSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateCourseValidationSchema = z
  .object({
    body: z.object({
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

      preRequisiteCourses: z
        .array(updatePreRequisiteCoursesZodSchema)
        .optional(),
      isDeleted: z.boolean().optional(),
    }),
  })
  .partial();

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
