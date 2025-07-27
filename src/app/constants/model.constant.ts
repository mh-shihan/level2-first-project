import { TBloodGroup, TGender } from '../interface/modules';

export const Gender: TGender[] = ['male', 'female', 'other'];

export const BloodGroup: TBloodGroup[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
];

export const BloodGroupErrorMessage =
  'The blood group you entered is invalid. Please select a valid blood group: A+, A-, B+, B-, AB+, AB-, O+, O-.';
