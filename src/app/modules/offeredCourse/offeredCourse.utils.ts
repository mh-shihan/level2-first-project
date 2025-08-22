import { TSchedule } from './offeredCourse.interface';

// Reusable time validation function
export const isValid24HourTime = (time: string) => {
  const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(time);
};

export const hasTimeConflict = (
  assignedSchedules: TSchedule[],
  newSchedule: TSchedule,
) => {
  const newStart = new Date(`1970-01-01T${newSchedule.startTime}`);
  const newEnd = new Date(`1970-01-01T${newSchedule.endTime}`);

  let low = 0;
  let high = assignedSchedules.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const existingStart = new Date(
      `1970-01-01T${assignedSchedules[mid].startTime}`,
    );
    const existingEnd = new Date(
      `1970-01-01T${assignedSchedules[mid].endTime}`,
    );

    // Check if new schedule overlaps with the mid schedule
    if (newStart < existingEnd && newEnd > existingStart) {
      return true; // conflict found
    }

    if (newStart >= existingEnd) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return false;
};
