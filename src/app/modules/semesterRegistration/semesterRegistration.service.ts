import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const semesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {
  const result = await SemesterRegistration.create(payload);
  return result;
};

export const SemesterRegistrationServices = {
  semesterRegistrationIntoDB,
};
