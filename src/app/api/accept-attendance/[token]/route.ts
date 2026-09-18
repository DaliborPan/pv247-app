import { db } from '@/db';
import { studentLectures } from '@/db/schema/studentLecture';
import { getSession } from '@/modules/session-user/session-user';
import { acceptAttendanceCodeSchema } from '@/modules/student-lecture/schema';

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) => {
  const token = (await params).token;
  const sessionUser = await getSession();

  if (!sessionUser) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.url);

    return Response.redirect(loginUrl);
  }

  const url = new URL('/accept-attendance', request.url);

  const lecture = await db.query.lectures.findFirst({
    columns: { id: true },
    where: (lectures, { eq }) => eq(lectures.attendanceToken, token),
    orderBy: (lectures, { asc }) => [asc(lectures.availableFrom)]
  });

  if (!lecture) {
    url.searchParams.set(
      'code',
      acceptAttendanceCodeSchema.Values.INVALID_TOKEN
    );

    return Response.redirect(url);
  }

  const existing = await db.query.studentLectures.findFirst({
    columns: { id: true },
    where: (studentLectures, { and, eq }) =>
      and(
        eq(studentLectures.studentId, sessionUser.id),
        eq(studentLectures.lectureId, lecture.id)
      )
  });

  if (!existing) {
    await db.insert(studentLectures).values({
      studentId: sessionUser.id,
      lectureId: lecture.id
    });
  }

  url.searchParams.set('code', acceptAttendanceCodeSchema.Values.SUCCESS);

  return Response.redirect(url);
};
