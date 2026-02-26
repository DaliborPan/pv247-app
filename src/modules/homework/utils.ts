import { orderedHomeworkSlugs } from '../lecture/const/homework-slug';
import { HomeworkSlugType } from '../lecture/schema';

export const getHomeworkGithubUrl = ({
  githubName,
  homeworkSlug
}: {
  githubName: string | null;
  homeworkSlug: HomeworkSlugType | undefined;
}) => {
  const order = homeworkSlug
    ? orderedHomeworkSlugs.indexOf(homeworkSlug) + 1
    : undefined;

  return order && githubName
    ? `https://github.com/FI-PV247/${order === 1 ? 'task-01' : `t-0${order}`}-${homeworkSlug}-${githubName}`
    : undefined;
};

export const getHomeworkPointsMessage = ({
  points,
  hasGradingStarted
}: {
  points?: number;
  hasGradingStarted: boolean;
}) => {
  if (points !== undefined) return `${points} points`;
  if (!hasGradingStarted) return "Grading hasn't started yet";

  return "Your submission hasn't been graded yet";
};
