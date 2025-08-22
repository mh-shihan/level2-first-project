export const Days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

// Reusable time validation function
export const isValid24HourTime = (time: string) => {
  const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(time);
};
export const invalidTimeFormat: string =
  'Invalid time format, expected "HH:MM" in 24 hours format';
