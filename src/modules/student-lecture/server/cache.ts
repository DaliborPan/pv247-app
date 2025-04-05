import { revalidateTag, unstable_cache } from 'next/cache';

import { getStudentLectures } from './repository';

/**
 * TODO(dalibor): Possible improvement to use `React.cache` since
 * it is called twice when accesing student-detail/:id page
 *
 * - Once for student overview
 * - Once for student attendance
 */
export const getStudentLecturesCached = (() => {
  const getTag = (studentId: string) => `getStudentLectures-${studentId}`;

  const handler = (studentId: string) =>
    unstable_cache(
      () => {
        console.log(`[CACHE_MISS]: ${getTag(studentId)}`);

        return getStudentLectures(studentId);
      },
      [getTag(studentId)],
      {
        tags: [getTag(studentId)]
      }
    )();

  handler.revalidate = (studentId: string) => revalidateTag(getTag(studentId));

  return handler;
})();
