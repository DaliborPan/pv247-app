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
    ? `https://github.com/FI-PV247/t-0${order}-${homeworkSlug}-${githubName}`
    : undefined;
};
