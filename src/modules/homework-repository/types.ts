import { type HomeworkRepositoryStatusType } from './schema';

export type HomeworkRepositoryType = {
  lectureId: string;
  repositoryUrl: string | null;
  status: HomeworkRepositoryStatusType;
};

export type HomeworkRepositoryResultType =
  | { status: 'preparing' }
  | { status: 'ready'; repositoryUrl: string };
