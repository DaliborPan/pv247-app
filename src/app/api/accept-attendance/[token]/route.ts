import { db } from '@/db';
import { getSession } from '@/modules/session-user';
import { acceptAttendanceCodeSchema } from '@/modules/student-lecture/schema';
import { studentLectureMutations } from '@/modules/student-lecture/server/mutation';
import { getStudentLecturesTag } from '@/modules/student-lecture/server/tag';
import { revalidateTag } from 'next/cache';

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

  const updated = await studentLectureMutations.createMine(
    sessionUser,
    lecture.id
  );
  url.searchParams.set('code', acceptAttendanceCodeSchema.Values.SUCCESS);

  if (updated) {
    revalidateTag(getStudentLecturesTag(sessionUser.id), 'max');
  }

  return Response.redirect(url);
};
