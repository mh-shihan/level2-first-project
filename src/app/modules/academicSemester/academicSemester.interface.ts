import { academicSemesterNameCodeMapper } from './academicSemester.constant';

export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSemesterName = 'Spring' | 'Summer' | 'Fall';

export type TAcademicSemesterCode = '01' | '02' | '03';

export type TAcademicSemester = {
  name: keyof typeof academicSemesterNameCodeMapper;
  code: TAcademicSemesterCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};

export type TAcademicSemesterNameCodeMapper = {
  [key: string]: string;
};
