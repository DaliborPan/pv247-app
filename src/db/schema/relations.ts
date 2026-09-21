import { relations } from 'drizzle-orm';

import { user as users } from './users/users';
import { projects } from './projects/projects';
import { homeworks } from './homeworks';
import { lectures } from './lectures/lectures';
import { studentLectures } from './studentLecture';
import { lectureLectors } from './lecture-lector';
import { homeworkRepositories } from './homework-repository';

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
  homeworkRepositories: many(homeworkRepositories),
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
  homeworkRepositories: many(homeworkRepositories),
  homeworks: many(homeworks),
  students: many(studentLectures),
  lectors: many(lectureLectors)
}));

export const homeworkRepositoryRelations = relations(
  homeworkRepositories,
  ({ one }) => ({
    student: one(users, {
      fields: [homeworkRepositories.studentId],
      references: [users.id]
    }),
    lecture: one(lectures, {
      fields: [homeworkRepositories.lectureId],
      references: [lectures.id]
    })
  })
);

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

export const lectureLectorRelations = relations(lectureLectors, ({ one }) => ({
  lecture: one(lectures, {
    fields: [lectureLectors.lectureId],
    references: [lectures.id]
  }),
  lector: one(users, {
    fields: [lectureLectors.lectorId],
    references: [users.id]
  })
}));
