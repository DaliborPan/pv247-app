import 'server-only';
import { cache } from 'react';

import { db } from '@/db';
import { getStudentProjectQuery } from '@/modules/project/queries';
import { getSessionUser } from '@/modules/session-user/session-user';
import {
  getStudentHomeworksQuery,
  studentHomeworkSelection
} from '@/modules/student-homework/queries';
import { getStudentLecturesQuery } from '@/modules/student-lecture/queries';

import {
  type StudentHomeworkStudentType,
  type StudentOverviewType,
  type StudentProgressType,
  type StudentType
} from './types';

const studentSelection = {
  columns: {
    id: true,
    name: true,
    firstName: true,
    lastName: true,
    github: true,
    lectorId: true,
    role: true
  }
} satisfies Parameters<typeof db.query.users.findFirst>[0];

export const getStudentQuery = cache(
  async (studentId: string): Promise<StudentType> => {
    const sessionUser = await getSessionUser();

    if (sessionUser.role !== 'lector') {
      throw new Error('Unauthorized');
    }

    const student = await db.query.users.findFirst({
      ...studentSelection,
      where: (users, { and, eq }) =>
        and(eq(users.id, studentId), eq(users.role, 'student'))
    });

    if (!student) {
      throw new Error(`Student ${studentId} not found`);
    }

    return student;
  }
);

export const getStudentsQuery = cache(
  async (): Promise<StudentProgressType[]> => {
    const sessionUser = await getSessionUser();

    if (sessionUser.role !== 'lector') {
      throw new Error('Unauthorized');
    }

    const students = await db.query.users.findMany({
      ...studentSelection,
      where: (users, { eq }) => eq(users.role, 'student'),
      with: {
        studentHomeworks: { columns: { points: true } },
        studentLectures: { columns: { id: true } },
        project: { columns: { id: true, name: true } }
      }
    });

    return students.map(({ studentHomeworks, studentLectures, ...student }) => {
      const homeworkPoints = studentHomeworks.reduce(
        (total, homework) => total + (homework.points ?? 0),
        0
      );
      const attendanceCount = studentLectures.length;

      return {
        ...student,
        homeworkPoints,
        attendanceCount,
        hasEnoughHomeworkPoints: homeworkPoints >= 130,
        hasEnoughAttendance: attendanceCount >= 8
      };
    });
  }
);

export const getStudentsWithHomeworkQuery = cache(
  async (lectureId: string): Promise<StudentHomeworkStudentType[]> => {
    const sessionUser = await getSessionUser();

    if (sessionUser.role !== 'lector') {
      throw new Error('Unauthorized');
    }

    return await db.query.users.findMany({
      ...studentSelection,
      where: (users, { eq }) => eq(users.role, 'student'),
      with: {
        studentHomeworks: {
          columns: studentHomeworkSelection,
          where: (studentHomeworks, { eq }) =>
            eq(studentHomeworks.lectureId, lectureId)
        }
      }
    });
  }
);

export const getStudentOverviewQuery = cache(
  async (studentId: string): Promise<StudentOverviewType> => {
    const sessionUser = await getSessionUser();

    if (sessionUser.role !== 'lector' && sessionUser.id !== studentId) {
      throw new Error('Unauthorized');
    }

    const [studentHomeworks, attendances, project] = await Promise.all([
      getStudentHomeworksQuery(studentId),
      getStudentLecturesQuery(studentId),
      getStudentProjectQuery(studentId)
    ]);
    const homeworkTotalPoints = studentHomeworks.reduce(
      (total, homework) => total + (homework.points ?? 0),
      0
    );

    return {
      awardedHomeworkCount: studentHomeworks.filter(
        record => record.points !== undefined && record.points !== null
      ).length,
      studentHomeworks,
      homeworkTotalPoints,
      totalPoints: homeworkTotalPoints,
      attendanceCount: attendances.length,
      project
    };
  }
);

export const getMyStudentOverviewQuery = cache(
  async (): Promise<StudentOverviewType> => {
    const sessionUser = await getSessionUser();

    return await getStudentOverviewQuery(sessionUser.id);
  }
);
