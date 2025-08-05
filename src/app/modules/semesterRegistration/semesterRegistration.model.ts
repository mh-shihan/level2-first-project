import { model, Schema } from 'mongoose';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';

const semesterRegistrationSchema = new Schema<TSemesterRegistration>({
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
    unique: true,
    required: true,
  },
  status: {
    type: String,
    enum: SemesterRegistrationStatus,
    default: 'UPCOMING',
  },
  startDate: {
    type: Date,
    required: true,
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
