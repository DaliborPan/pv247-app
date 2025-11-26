import { lectureQueries } from '@/modules/lecture/server';
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

  const url = new URL('/accept-attendance', request.url);

  if (!sessionUser) {
    url.searchParams.set(
      'code',
      acceptAttendanceCodeSchema.Values.UNAUTHORIZED
    );

    return Response.redirect(url);
  }

  const lectures = await lectureQueries.getOrdered();
  const lecture = lectures.find(lecture => lecture.attendanceToken === token);

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
