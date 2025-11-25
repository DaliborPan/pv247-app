import { lectureQueries } from '@/modules/lecture/server';
import { getSession } from '@/modules/session-user';
import { acceptAttendanceCodeSchema } from '@/modules/student-lecture/schema';
import { processAcceptMineAttendanceMutation } from '@/modules/student-lecture/server';

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

  const updated = await processAcceptMineAttendanceMutation(
    sessionUser,
    lecture.id
  );
  url.searchParams.set('code', acceptAttendanceCodeSchema.Values.SUCCESS);

  if (updated) {
    // TODO(pv247)
    // revalidateTag()
  }

  return Response.redirect(url);
};
