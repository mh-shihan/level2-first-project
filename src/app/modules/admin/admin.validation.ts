import { z } from 'zod/v4';
import {
  bloodGroupEnum,
  createUserNameValidationSchema,
  genderEnum,
  updateBloodGroupEnum,
  updateGenderEnum,
  updateUserNameValidationSchema,
} from '../../validationConstants/validation.constant';

export const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    admin: z.object({
      designation: z.string(),
      name: createUserNameValidationSchema,
      gender: genderEnum,
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: bloodGroupEnum,
      presentAddress: z.string(),
      permanentAddress: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string(),
    }),
  }),
});

export const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      designation: z.string().optional(),
      name: updateUserNameValidationSchema,
      gender: updateGenderEnum,
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: updateBloodGroupEnum,
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const AdminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
