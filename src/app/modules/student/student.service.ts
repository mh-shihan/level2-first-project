import { Student } from './student.model';

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
  getAllStudentsFromBD,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
