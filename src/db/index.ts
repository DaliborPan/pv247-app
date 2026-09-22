import 'server-only';
import { drizzle } from 'drizzle-orm/libsql';

import { lectureLectors } from './schema/lecture-lector';
import { lectures } from './schema/lectures/lectures';
import { projects } from './schema/projects/projects';
import * as relations from './schema/relations';
import { studentHomeworks } from './schema/student-homework';
import { studentLectures } from './schema/studentLecture';
import { user as users } from './schema/users/users';

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
