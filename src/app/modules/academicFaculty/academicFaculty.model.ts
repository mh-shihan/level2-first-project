import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';
import status from 'http-status';
import AppError from '../../errors/AppError';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

academicFacultySchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicFaculty.findOne({
    name: this.name,
  });

  if (isDepartmentExist) {
    throw new AppError(status.CONFLICT, `${this.name} already exists!`);
  }

  next();
});

academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExit = await AcademicFaculty.findOne(query);

  if (!isDepartmentExit) {
    throw new AppError(status.NOT_FOUND, 'This Faculty does not exists!');
  }

  next();
});

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
