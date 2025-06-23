import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student/student.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    maxlength: [20, 'First name can not be more than 20 characters'],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format.',
    },
    required: [true, 'First name is required'],
  },
  middleName: { type: String, required: [true, 'Middle name is required'] },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid.',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, "Father's name is required"] },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  fatherDesignation: {
    type: String,
    required: [true, "Father's designation is required"],
  },
  motherName: { type: String, required: [true, "Mother's name is required"] },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
  },
  motherDesignation: {
    type: String,
    required: [true, "Mother's designation is required"],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, 'Local guardian name is required'] },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contact number is required'],
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Student password is required'],
      maxlength: [20, 'Password can not be more than 20 characters'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message:
          '{VALUE} is not supported. Allowed values are "male" or "female"',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not in email format.',
      },
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message:
          'The blood group you entered is invalid. Please select a valid blood group: A+, A-, B+, B-, AB+, AB-, O+, O-.',
      },
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian information is required'],
    },
    profileImage: { type: String },
    isActive: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  },
);

// pre save middleware hook : will work on create function and save function
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save the data');
  // const user = this;
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// Post save middleware hook
studentSchema.post('save', function () {
  console.log(this, 'Post hook: we will save the data');
});

// Creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
