import { NavigationButtonLink } from '@/components/navigation-button-link';
import { lectureLoaders } from '@/modules/lecture/loader';
import { HomeworkSlugType } from '@/modules/lecture/schema';
import { Suspense } from 'react';

const Navigation = async (props: { slug: Promise<HomeworkSlugType> }) => {
  const slug = await props.slug;

  const lectures = await lectureLoaders.getAllWithHomework();
  const slugLectureIndex = lectures.findIndex(
    lecture => lecture.homeworkSlug === slug
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
    </>
  );
};

const Layout = ({ params, children }: LayoutProps<'/homeworks/[slug]'>) => {
  return (
    <>
      <Suspense>
        <Navigation
          slug={params.then(params => params.slug as HomeworkSlugType)}
        />
      </Suspense>

      <main className="mx-auto -mt-10 max-w-4xl">{children}</main>
    </>
  );
};

export default Layout;
