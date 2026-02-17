import { relations } from 'drizzle-orm';

import { users } from './users';
import { projects } from './projects';
import { homeworks } from './homeworks';
import { lectures } from './lectures';
import { studentLectures } from './studentLecture';
import { lectureLectors } from './lectureLector';

export const userRelations = relations(users, ({ one, many }) => ({
  project: one(projects, {
    fields: [users.projectId],
    references: [projects.id]
  }),
  lector: one(users, {
    fields: [users.lectorId],
    references: [users.id],
    relationName: 'lector'
  }),

  studentLectures: many(studentLectures),
  lectureLectors: many(lectureLectors),

  homeworksStudent: many(homeworks, {
    relationName: 'hw-student'
  }),
  homeworksLector: many(homeworks, {
    relationName: 'hw-lector'
  }),
  students: many(users, {
    relationName: 'lector'
  })
}));

export const projectRelations = relations(projects, ({ many }) => ({
  users: many(users)
}));

export const lectureRelations = relations(lectures, ({ many }) => ({
  homeworks: many(homeworks),
  students: many(studentLectures),
  lectors: many(lectureLectors)
}));

export const homeworkRelations = relations(homeworks, ({ one }) => ({
  student: one(users, {
    fields: [homeworks.studentId],
    references: [users.id],
    relationName: 'hw-student'
  }),
  lector: one(users, {
    fields: [homeworks.lectorId],
    references: [users.id],
    relationName: 'hw-lector'
  }),
  lecture: one(lectures, {
    fields: [homeworks.lectureId],
    references: [lectures.id]
  })
}));

export const studentLecutreRelations = relations(
  studentLectures,
  ({ one }) => ({
    student: one(users, {
      fields: [studentLectures.studentId],
      references: [users.id]
    }),
    lecture: one(lectures, {
      fields: [studentLectures.lectureId],
      references: [lectures.id]
    })
  })
);

export const lectureLectorRelations = relations(
  lectureLectors,
  ({ one }) => ({
    lecture: one(lectures, {
      fields: [lectureLectors.lectureId],
      references: [lectures.id]
    }),
    lector: one(users, {
      fields: [lectureLectors.lectorId],
      references: [users.id]
    })
  })
);
