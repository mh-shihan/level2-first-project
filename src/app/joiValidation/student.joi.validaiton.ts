import Joi from 'joi';

const userNameJoiValidationSchema = Joi.object({
  firstName: Joi.string()
    .max(20)
    .trim()
    .required()
    .custom((value, helpers) => {
      const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
      if (value !== capitalized) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .messages({
      'string.max': 'First name can not be more than 20 characters',
      'any.invalid': '{#value} is not in capitalize format.',
      'any.required': 'First name is required',
    }),

  middleName: Joi.string().required().messages({
    'any.required': 'Middle name is required',
  }),

  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      'string.pattern.base': '{#value} is not valid.',
      'any.required': 'Last name is required',
    }),
});

// Joi JoiValidationschema for guardian
const guardianJoiValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'any.required': "Father's name is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    'any.required': "Father's contact number is required",
  }),
  fatherDesignation: Joi.string().required().messages({
    'any.required': "Father's designation is required",
  }),
  motherName: Joi.string().required().messages({
    'any.required': "Mother's name is required",
  }),
  motherContactNo: Joi.string().required().messages({
    'any.required': "Mother's contact number is required",
  }),
  motherDesignation: Joi.string().required().messages({
    'any.required': "Mother's designation is required",
  }),
});

// Joi JoiValidationschema for localGuardian
const localGuardianJoiValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Local guardian name is required',
  }),
  occupation: Joi.string().required().messages({
    'any.required': 'Local guardian occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Local guardian contact number is required',
  }),
  address: Joi.string().required().messages({
    'any.required': 'Local guardian address is required',
  }),
});

// Joi schema for Student
const studentJoiJoiValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'Student ID is required',
  }),

  name: userNameJoiValidationSchema.required().messages({
    'any.required': 'Student name is required',
  }),

  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only':
      '{#value} is not supported. Allowed values are "male" or "female"',
    'any.required': 'Gender is required',
  }),

  dateOfBirth: Joi.string().optional(),

  email: Joi.string().email().required().messages({
    'string.email': '{#value} is not in email format.',
    'any.required': 'Email is required',
  }),

  contactNo: Joi.string().required().messages({
    'any.required': 'Contact number is required',
  }),

  emergencyContactNo: Joi.string().required().messages({
    'any.required': 'Emergency contact number is required',
  }),

  presentAddress: Joi.string().required().messages({
    'any.required': 'Present address is required',
  }),

  permanentAddress: Joi.string().required().messages({
    'any.required': 'Permanent address is required',
  }),

  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .messages({
      'any.only':
        'The blood group you entered is invalid. Please select a valid blood group: A+, A-, B+, B-, AB+, AB-, O+, O-.',
    }),

  guardian: guardianJoiValidationSchema.required().messages({
    'any.required': 'Guardian information is required',
  }),

  localGuardian: localGuardianJoiValidationSchema.required().messages({
    'any.required': 'Local guardian information is required',
  }),

  profileImage: Joi.string().optional(),

  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentJoiJoiValidationSchema;
