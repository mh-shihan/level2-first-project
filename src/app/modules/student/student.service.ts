import { StudentModel } from "../student.model";
import { Student } from "./student.interface";

const createStudentIntoDB = async (student: Student) => {
  try {
    const result = await StudentModel.create(student);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const StudentServices = {
  createStudentIntoDB,
};
