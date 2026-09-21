import { type LectureLectorStatusType } from './schema';

export type LectureLectorType = {
  id: string;
  lectorId: string;
  status: LectureLectorStatusType;
  isApproved: boolean;
  lector: {
    name: string;
    firstName: string | null;
    lastName: string | null;
  };
};

export type LectureApprovedLectorType = {
  id: string;
  lector: {
    name: string;
    firstName: string | null;
    lastName: string | null;
    image: string | null;
  };
};
