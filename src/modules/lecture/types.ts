import { type HomeworkSlugType, type LectureSlugType } from './schema';

export type LectureType = {
  id: string;
  name: string;
  availableFrom: string;
  slug: LectureSlugType;
  preview: string;
  isAvailable: boolean;
  homeworkName: string;
  homeworkSlug: HomeworkSlugType;
  homeworkPreview: string;
  homeworkTemplateRepositoryUrl: string | null;
  homeworkMaxPoints: number;
};

export type LectureAttendanceType = {
  id: string;
  name: string;
  availableFrom: string;
  attendanceToken: string;
};
