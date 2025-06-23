import { Student } from '../student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User Already Exits!');
  }

  const result = await Student.create(studentData); // Built-in static method

  // const student = new StudentModel(studentData);
  // const result = await student.save();

  return result;
};

const getAllStudentsFromBD = async () => {
  // const result = await Student.find();
  const result = await Student.aggregate([
    { $sort: { createdAt: -1 } },
    { $project: { password: 0 } },
  ]);
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromBD,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
