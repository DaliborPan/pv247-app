import { db } from '@/db';

/**
 * Get all student-lectures by lectureId or studentId
 */
export const getStudentLectures = async ({
  lectureId,
  studentId
}: {
  lectureId?: string;
  studentId?: string;
}) => {
  if (!lectureId && !studentId) {
    return [];
  }

  return db.query.studentLectures.findMany({
    where: (studentLectures, { eq, and }) => {
      if (lectureId && studentId) {
        return and(
          eq(studentLectures.lectureId, lectureId),
          eq(studentLectures.studentId, studentId)
        );
      }

      if (lectureId) {
        return eq(studentLectures.lectureId, lectureId);
      }

      if (studentId) {
        return eq(studentLectures.studentId, studentId);
      }
    }
  });
};
