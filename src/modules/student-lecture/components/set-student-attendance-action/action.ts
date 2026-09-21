'use server';

import { and, eq } from 'drizzle-orm';
import { refresh } from 'next/cache';
import { z } from 'zod';

import { db } from '@/db';
import { studentLectures } from '@/db/schema/studentLecture';
import { authLectorServerAction } from '@/server/server-actions';

export const setStudentAttendanceAction = authLectorServerAction
  .input(
    z.object({
      studentId: z.string(),
      lectureId: z.string()
    })
  )
  .handler(async ({ input }) => {
    const attendanceFilter = and(
      eq(studentLectures.studentId, input.studentId),
      eq(studentLectures.lectureId, input.lectureId)
    );
    const existing = await db.query.studentLectures.findFirst({
      columns: { id: true },
      where: attendanceFilter
    });

    if (existing) {
      await db.delete(studentLectures).where(attendanceFilter);
    } else {
      await db.insert(studentLectures).values({
        studentId: input.studentId,
        lectureId: input.lectureId
      });
    }

    refresh();

    return {
      status: existing ? ('deleted' as const) : ('created' as const)
    };
  });
