import { type ProjectStatusType } from './schema';

export type ProjectType = {
  id: string;
  name: string;
  description: string | null;
  shortDescription: string | null;
  github: string | null;
  comment: string | null;
  status: ProjectStatusType;
  updatedAt: string;
  users: {
    id: string;
    name: string;
    firstName: string | null;
    lastName: string | null;
  }[];
};

export type ProjectStudentOptionType = {
  value: string;
  label: string;
};
