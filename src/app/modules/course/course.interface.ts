import { Types } from 'mongoose';

export type TPreRequisiteCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: TPreRequisiteCourses[];
  isDeleted?: boolean;
};

export type TFaculty = {
  faculty: Types.ObjectId;
};
export type TCourseFaculty = {
  course: Types.ObjectId;
  faculties: TFaculty[];
};
