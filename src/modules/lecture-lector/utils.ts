import { lectureLectorStatusOptions, LectureLectorStatusType } from './schema';

export const getLectureLectorStatusLabel = (status: LectureLectorStatusType) =>
  lectureLectorStatusOptions.find(option => option.value === status)?.label ??
  status;
