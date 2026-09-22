import { relations } from 'drizzle-orm';

import { user as users } from './users/users';
import { projects } from './projects/projects';
import { lectures } from './lectures/lectures';
import { studentLectures } from './studentLecture';
import { lectureLectors } from './lecture-lector';
import { studentHomeworks } from './student-homework';

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
  studentHomeworks: many(studentHomeworks, {
    relationName: 'student-homework-student'
  }),
  gradedStudentHomeworks: many(studentHomeworks, {
    relationName: 'student-homework-grader'
  }),
  lectureLectors: many(lectureLectors),

  students: many(users, {
    relationName: 'lector'
  })
}));

export const projectRelations = relations(projects, ({ many }) => ({
  users: many(users)
}));

export const lectureRelations = relations(lectures, ({ many }) => ({
  studentHomeworks: many(studentHomeworks),
  students: many(studentLectures),
  lectors: many(lectureLectors)
}));

export const studentHomeworkRelations = relations(
  studentHomeworks,
  ({ one }) => ({
    student: one(users, {
      fields: [studentHomeworks.studentId],
      references: [users.id],
      relationName: 'student-homework-student'
    }),
    lecture: one(lectures, {
      fields: [studentHomeworks.lectureId],
      references: [lectures.id]
    }),
    grader: one(users, {
      fields: [studentHomeworks.gradedBy],
      references: [users.id],
      relationName: 'student-homework-grader'
    })
  })
);

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
