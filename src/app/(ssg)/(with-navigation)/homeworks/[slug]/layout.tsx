import { type PropsWithChildren } from 'react';

import { NavigationButtonLink } from '@/components/navigation-button-link';
import { lectureLoaders } from '@/modules/lecture/loader';

const Layout = async ({
  children,
  ...props
}: LayoutProps<'/homeworks/[slug]'>) => {
  const params = await props.params;
  const lectures = await lectureLoaders.getAllWithHomework();

  const slugLectureIndex = lectures.findIndex(
    lecture => lecture.homeworkSlug === params.slug
  );

  const prevLecture = lectures[slugLectureIndex - 1];
  const nextLecture = lectures[slugLectureIndex + 1];

  return (
    <>
      <div className="flex flex-col justify-between md:flex-row">
        <div>
          {prevLecture && (
            <NavigationButtonLink
              type="previous"
              href={`/homeworks/${prevLecture.homeworkSlug}`}
              name={prevLecture.homeworkName}
            />
          )}
        </div>

        <div>
          {nextLecture && (
            <NavigationButtonLink
              type="next"
              href={`/homeworks/${nextLecture.homeworkSlug}`}
              name={nextLecture.homeworkName}
            />
          )}
        </div>
      </div>

      <main className="mx-auto -mt-10 max-w-4xl">{children}</main>
    </>
  );
};

export default Layout;
