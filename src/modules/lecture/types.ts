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
  homeworkClassroomLink: string;
  homeworkTemplateRepositoryUrl: string | null;
  homeworkMaxPoints: number;
  homeworkDeadline: string;
};

export type LectureAttendanceType = {
  id: string;
  name: string;
  attendanceToken: string;
};
