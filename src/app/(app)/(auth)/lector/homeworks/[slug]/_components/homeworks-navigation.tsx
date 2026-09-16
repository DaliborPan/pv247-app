import { type HomeworkSlugType } from '@/modules/lecture/schema';

import { HomeworkNavigationLink } from './homework-navigation-link';
import { getLecturesQuery } from '@/modules/lecture/queries';

export const HomeworksNavigation = async ({
  homeworkSlug
}: {
  homeworkSlug: HomeworkSlugType;
}) => {
  const lectures = await getLecturesQuery();

  const slugLectureIndex = lectures.findIndex(
    lecture => lecture.homeworkSlug === homeworkSlug
  );

  const prevLecture = lectures[slugLectureIndex - 1];
  const nextLecture = lectures[slugLectureIndex + 1];

  return (
    <div className="flex gap-x-4">
      {prevLecture && (
        <HomeworkNavigationLink
          type="previous"
          lecture={{
            homeworkSlug: prevLecture.homeworkSlug,
            name: prevLecture.name
          }}
        />
      )}

      {nextLecture && (
        <HomeworkNavigationLink
          type="next"
          lecture={{
            homeworkSlug: nextLecture.homeworkSlug,
            name: nextLecture.name
          }}
        />
      )}
    </div>
  );
};
