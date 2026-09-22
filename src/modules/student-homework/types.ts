import { type StudentHomeworkStatusType } from './schema';

export type StudentHomeworkType = {
  lectureId: string;
  repositoryUrl: string | null;
  status: StudentHomeworkStatusType;
  points: number | null;
};

export type StudentHomeworkResultType =
  | { status: 'preparing' }
  | { status: 'ready'; repositoryUrl: string };

export type StudentHomeworkGradingStatusType = {
  hasGradingStarted: boolean;
};
