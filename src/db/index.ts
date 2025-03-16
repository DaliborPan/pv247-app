import { drizzle } from 'drizzle-orm/libsql';

import {
  homeworks,
  type Homework,
  type HomeworkInsert
} from './schema/homeworks';
import {
  lectures,
  lectureSlugSchema,
  homeworkSlugSchema,
  type Lecture,
  type LectureSlug,
  type HomeworkSlug
} from './schema/lectures';
import { projects, type Project } from './schema/projects';
import { users, type User } from './schema/users';
import { studentLectures } from './schema/studentLecture';
import * as relations from './schema/relations';

const db = drizzle({
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
    ...relations
  }
});

export {
  db,

  // homeworks
  homeworks,
  type Homework,
  type HomeworkInsert,

  // lecture
  lectures,
  lectureSlugSchema,
  homeworkSlugSchema,
  type Lecture,
  type LectureSlug,
  type HomeworkSlug,

  // project
  projects,
  type Project,

  // users
  users,
  type User
};
