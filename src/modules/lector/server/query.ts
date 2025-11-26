import { getHomeworkReviewers } from './repository';

export const getNewStudentLectorIdQuery = async () => {
  const reviewerEmails = process.env.HOMEWORK_REVIEWER_EMAILS?.split(';') ?? [];
  const reviewers = await getHomeworkReviewers({ reviewerEmails });

  if (!reviewers.length) {
    throw new Error(`No reviewers found`);
  }

  return reviewers.reduce((acc, lector) => {
    if (lector.students.length < acc.students.length) {
      return lector;
    }

    return acc;
  }, reviewers[0]).id;
};
