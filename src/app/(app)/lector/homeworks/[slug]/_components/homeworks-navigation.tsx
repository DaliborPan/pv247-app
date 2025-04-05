import { getOrderedLecturesLoader } from '@/modules/lecture/loader';
import { type HomeworkSlugType } from '@/modules/lecture/schema';

import { HomeworkNavigationLink } from './homework-navigation-link';

export const HomeworksNavigation = async ({
  homeworkSlug
}: {
  homeworkSlug: HomeworkSlugType;
}) => {
  const lectures = await getOrderedLecturesLoader();

  const slugLectureIndex = lectures.findIndex(
    lecture => lecture.homeworkSlug === homeworkSlug
  );

  const prevLecture = lectures[slugLectureIndex - 1];
  const nextLecture = lectures[slugLectureIndex + 1];

  return (
    <div className="flex gap-x-4">
      {prevLecture && (
        <HomeworkNavigationLink type="previous" lecture={prevLecture} />
      )}

      {nextLecture && (
        <HomeworkNavigationLink type="next" lecture={nextLecture} />
      )}
    </div>
  );
};
