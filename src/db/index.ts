import { drizzle } from 'drizzle-orm/libsql';

import { homeworks } from './schema/homeworks';
import { homeworkRepositories } from './schema/homework-repository';
import { lectures } from './schema/lectures';
import { projects } from './schema/projects';
import { users } from './schema/users';
import { studentLectures } from './schema/studentLecture';
import { lectureLectors } from './schema/lecture-lector';
import * as relations from './schema/relations';

export const db = drizzle({
  connection: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.AUTH_TOKEN
  },
  schema: {
    homeworks,
    homeworkRepositories,
    lectures,
    projects,
    users,
    studentLectures,
    lectureLectors,
    ...relations
  }
});
