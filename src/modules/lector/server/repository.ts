import { db } from '@/db';

export const getLectorStudents = ({ lectorId }: { lectorId: string }) =>
  db.query.users.findFirst({
    where: (table, { eq }) => eq(table.id, lectorId),
    with: {
      students: {
        with: {
          homeworksStudent: true
        }
      }
    }
  });
