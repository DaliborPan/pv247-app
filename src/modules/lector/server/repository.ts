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

export const getHomeworkReviewers = ({
  reviewerEmails
}: {
  reviewerEmails: string[];
}) =>
  db.query.users.findMany({
    where: (users, { eq, or }) =>
      or(...reviewerEmails.map(email => eq(users.email, email))),
    with: {
      students: true
    }
  });
