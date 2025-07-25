import { z } from 'zod/v4';

// Enums
const genderEnum = z.enum(['male', 'female']);
const bloodGroupEnum = z.enum([
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
]);
// const statusEnum = z.enum(['active', 'blocked']);

// User Name Schema
const userNameValidationSchema = z.object({
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

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty("Father's name is required"),
  fatherContactNo: z.string().nonempty("Father's contact number is required"),
  fatherDesignation: z.string().nonempty("Father's designation is required"),
  motherName: z.string().nonempty("Mother's name is required"),
  motherContactNo: z.string().nonempty("Mother's contact number is required"),
  motherDesignation: z.string().nonempty("Mother's designation is required"),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().nonempty('Local guardian name is required'),
  occupation: z.string().nonempty('Local guardian occupation is required'),
  contactNo: z.string().nonempty('Local guardian contact number is required'),
  address: z.string().nonempty('Local guardian address is required'),
});

// Update User Name Schema (all fields optional)
const updateUserNameValidationSchema = z.object({
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

// Update Guardian Schema (all fields optional)
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherContactNo: z.string().optional(),
  fatherDesignation: z.string().optional(),
  motherName: z.string().optional(),
  motherContactNo: z.string().optional(),
  motherDesignation: z.string().optional(),
});

// Update Local Guardian Schema (all fields optional)
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

// Student Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .nonempty()
      .max(20, 'First name can not be more than 20 characters'),
    student: z.object({
      name: userNameValidationSchema,
      gender: genderEnum,
      dateOfBirth: z.string().optional(),
      email: z.email().nonempty('Email is required'),
      contactNo: z.string().nonempty('Contact number is required'),
      emergencyContactNo: z
        .string()
        .nonempty('Emergency contact number is required'),
      presentAddress: z.string().nonempty('Present address is required'),
      permanentAddress: z.string().nonempty('Permanent address is required'),
      bloodGroup: bloodGroupEnum.optional(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImage: z.string().optional(),
    }),
  }),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z
      .object({
        name: updateUserNameValidationSchema.optional(),
        gender: genderEnum.optional(),
        dateOfBirth: z.string().optional(),
        email: z.email().optional(),
        contactNo: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        bloodGroup: bloodGroupEnum.optional(),
        guardian: updateGuardianValidationSchema.optional(),
        localGuardian: updateLocalGuardianValidationSchema.optional(),
        admissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
        profileImage: z.string().optional(),
      })
      .optional(),
  }),
});

export const StudentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
