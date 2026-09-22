import { type ProjectType } from '@/modules/project/types';
import { type UserRoleType } from '@/modules/session-user/schema';
import { type StudentHomeworkType } from '@/modules/student-homework/types';

export type StudentType = {
  id: string;
  name: string;
  firstName: string | null;
  lastName: string | null;
  github: string | null;
  lectorId: string | null;
  role: UserRoleType;
};

export type StudentProgressType = StudentType & {
  project: Pick<ProjectType, 'id' | 'name'> | null;
  homeworkPoints: number;
  attendanceCount: number;
  hasEnoughHomeworkPoints: boolean;
  hasEnoughAttendance: boolean;
};

export type StudentHomeworkStudentType = StudentType & {
  studentHomeworks: StudentHomeworkType[];
};

export type StudentOverviewType = {
  awardedHomeworkCount: number;
  studentHomeworks: StudentHomeworkType[];
  homeworkTotalPoints: number;
  totalPoints: number;
  attendanceCount: number;
  project: ProjectType | null;
};
