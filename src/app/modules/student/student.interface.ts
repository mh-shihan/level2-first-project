import { Model, Types } from 'mongoose';
import { TBloodGroup, TGender, TUserName } from '../../interface/module';

export type TGuardian = {
  fatherName: string;
  fatherDesignation: string;
  fatherContactNo: string;
  motherName: string;
  motherDesignation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: TGender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: TBloodGroup;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  profileImage?: string;
  isDeleted: boolean;
};

// Creating statics
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}
