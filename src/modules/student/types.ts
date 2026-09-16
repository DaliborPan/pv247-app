import { type HomeworkType } from '@/modules/homework/types';
import { type ProjectType } from '@/modules/project/types';
import { type UserRoleType } from '@/modules/user/schema';

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

export type StudentHomeworkType = StudentType & {
  homeworksStudent: HomeworkType[];
};

export type StudentOverviewType = {
  awardedHomeworkCount: number;
  homework: HomeworkType[];
  homeworkTotalPoints: number;
  totalPoints: number;
  attendanceCount: number;
  project: ProjectType | null;
};
