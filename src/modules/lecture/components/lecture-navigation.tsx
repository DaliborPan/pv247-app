import { NavigationButtonLink } from '@/components/navigation-button-link';

import { lectureLoaders } from '../loader';
import { type LectureSlugType } from '../schema';

export const LectureNavigation = async ({
  baseHref = '/lectures',
  ...props
}: {
  lectureSlug: Promise<LectureSlugType>;
  baseHref?: string;
}) => {
  const lectureSlug = await props.lectureSlug;
  const lectures = await lectureLoaders.getOrdered();

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
