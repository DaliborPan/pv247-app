import { getLecturesWithHomeworkCachedQuery } from '@/modules/lecture/queries';
import { type HomeworkSlugType } from '@/modules/lecture/schema';

import { PersonHomeworkDeadline } from './person-homework-deadline';
import { LabeledItem } from './labeled-item';
import { HomeworkPoints } from './homework-points';
import { HomeworkRepositoryLink } from './homework-repository-link';
import { Suspense } from 'react';

export const HomeworkGeneralInfo = async ({
  slug
}: {
  slug: HomeworkSlugType;
}) => {
  const lectures = await getLecturesWithHomeworkCachedQuery();
  const lecture = lectures.find(lecture => lecture.homeworkSlug === slug);

  if (!lecture) return null;

  return (
    <>
      <div className="border-b border-primary-100 py-10">
        <h1 className="text-5xl font-light tracking-tight sm:text-6xl">
          {lecture.homeworkName}
        </h1>
        <p className="mt-10 text-lg font-light leading-8 text-markdown">
          {lecture.homeworkPreview}
        </p>
      </div>

      <div className="mt-8 grid items-center gap-4 rounded-lg bg-primary-100 p-4 lg:grid-cols-4 lg:gap-10">
        <div className="grow">
          <LabeledItem label="Maximum points">
            {lecture.homeworkMaxPoints} points
          </LabeledItem>
        </div>

        <div className="col-span-2">
          <LabeledItem label="Deadline">
            <PersonHomeworkDeadline lecture={lecture} />
          </LabeledItem>
        </div>

        <div>
          <Suspense>
            <HomeworkPoints lecture={lecture} />
          </Suspense>
        </div>
      </div>

      <Suspense>
        <HomeworkRepositoryLink lectureId={lecture.id} />
      </Suspense>
    </>
  );
};
