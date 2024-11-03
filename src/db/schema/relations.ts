import { relations } from 'drizzle-orm';

import { users } from './users';
import { projects } from './projects';
import { homeworks } from './homeworks';
import { lectures } from './lectures';

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
  homeworks: many(homeworks)
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
