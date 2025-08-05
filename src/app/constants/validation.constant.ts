import { z } from 'zod/v4';
// Enums
export const genderEnum = z.enum(['male', 'female', 'other']);
export const updateGenderEnum = z.enum(['male', 'female', 'other']).optional();

// const statusEnum = z.enum(['active', 'blocked']);

export const bloodGroupEnum = z.enum([
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
]);
export const updateBloodGroupEnum = z
  .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
  .optional();

// Create User Name Schema
export const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name can not be more than 20 characters')
    .refine((val) => val.charAt(0) === val.charAt(0).toUpperCase(), {
      message: 'First name must start with a capital letter',
    }),
  middleName: z.string().nonempty('Middle name is required'),
  lastName: z
    .string()
    .nonempty('Last name is required')
    .refine((val) => /^[A-Za-z]+$/.test(val), {
      message: 'Last name must contain only alphabet characters',
    }),
});

// Update User Name Schema (all fields optional)
export const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name can not be more than 20 characters')
    .refine((val) => val.charAt(0) === val.charAt(0).toUpperCase(), {
      message: 'First name must start with a capital letter',
    })
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .refine((val) => /^[A-Za-z]+$/.test(val), {
      message: 'Last name must contain only alphabet characters',
    })
    .optional(),
});

export const dateTime = z.string().refine(
  (val) => {
    return !isNaN(Date.parse(val)); // Checks if JS can parse the date
  },
  {
    message:
      'Must be a valid ISO 8601 date-time string (e.g., 2025-08-05T14:30:00Z)',
  },
);
