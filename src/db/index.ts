import 'server-only';

import { drizzle } from 'drizzle-orm/libsql';

import { studentHomeworks } from './schema/student-homework';
import { lectures } from './schema/lectures/lectures';
import { projects } from './schema/projects/projects';
import { user as users } from './schema/users/users';
import { studentLectures } from './schema/studentLecture';
import { lectureLectors } from './schema/lecture-lector';
import * as relations from './schema/relations';

export const db = drizzle({
  connection: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.AUTH_TOKEN
  },
  schema: {
    studentHomeworks,
    lectures,
    projects,
    users,
    studentLectures,
    lectureLectors,
    ...relations
  }
});
