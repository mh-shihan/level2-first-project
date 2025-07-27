import { z } from 'zod/v4';
// Enums
export const genderEnum = z.enum(['male', 'female', 'other']);

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
