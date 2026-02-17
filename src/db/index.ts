import { drizzle } from 'drizzle-orm/libsql';

import { homeworks } from './schema/homeworks';
import { lectures } from './schema/lectures';
import { projects } from './schema/projects';
import { users } from './schema/users';
import { studentLectures } from './schema/studentLecture';
import { lectureLectors } from './schema/lectureLector';
import * as relations from './schema/relations';

export const db = drizzle({
  connection: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.AUTH_TOKEN
  },
  schema: {
    homeworks,
    lectures,
    projects,
    users,
    studentLectures,
    lectureLectors,
    ...relations
  }
});
