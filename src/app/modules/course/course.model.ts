import { model, Schema } from 'mongoose';
import { TCourse, TPreRequisiteCourses } from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
  },
  idDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: [true, '{VALUE} is already exists!'],
    trim: true,
    required: [true, 'Course title is required'],
  },
  prefix: {
    type: String,
    trim: true,
    required: [true, 'Course prefix is required'],
  },
  code: {
    type: Number,
    trim: true,
    required: [true, 'Course code is required'],
  },
  credits: {
    type: Number,
    trim: true,
    required: [true, 'Course credits is required'],
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
});

export const course = model<TCourse>('Course', courseSchema);
