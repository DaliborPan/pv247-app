import { NavigationButtonLink } from '@/components/navigation-button-link';
import { type LectureSlug } from '@/db';

import { getOrderedLectures } from '../server/query';

export const LectureNavigation = async ({
  lectureSlug,
  baseHref = '/lectures'
}: {
  lectureSlug: LectureSlug;
  baseHref?: string;
}) => {
  const lectures = await getOrderedLectures();

  const slugLectureIndex = lectures.findIndex(
    lecture => lecture.slug === lectureSlug
  );

  const prevLecture = lectures[slugLectureIndex - 1];
  const nextLecture = lectures[slugLectureIndex + 1];

  return (
    <div className="flex flex-col justify-between gap-2 md:flex-row">
      <div className="w-full md:w-auto">
        {prevLecture && (
          <NavigationButtonLink
            type="previous"
            href={`${baseHref}/${prevLecture.slug}`}
            name={prevLecture.name}
          />
        )}
      </div>

      <div>
        {nextLecture && (
          <NavigationButtonLink
            type="next"
            href={`${baseHref}/${nextLecture.slug}`}
            name={nextLecture.name}
          />
        )}
      </div>
    </div>
  );
};
