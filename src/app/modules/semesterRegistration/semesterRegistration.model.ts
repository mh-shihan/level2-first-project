import { model, Schema } from 'mongoose';
import { TSemesterRegistration } from './semesterRegistration.interface';

const semesterRegistrationSchema = new Schema<TSemesterRegistration>({
  academicSemester: {
    types: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
  },
});

// Query middleware
semesterRegistrationSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

semesterRegistrationSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

semesterRegistrationSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Semester RegistrationSchema Model
export const SemesterRegistration = model<TSemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
