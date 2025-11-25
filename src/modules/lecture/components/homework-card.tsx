import { formatDate } from '@/lib/date';
import { TextPreview } from '@/components/text-preview';

import { type LectureType } from '../schema';

import { HomeworkPointsBadge } from './homework-points-badge';
import { HomeworkCardActions } from './homework-card-actions';
import { Suspense } from 'react';
import { homeworkLoader } from '@/modules/homework/loader';

export const HomeworkCard = ({ lecture }: { lecture: LectureType }) => {
  const homeworkPromise = homeworkLoader.getMine();

  return (
    <article className="flex flex-col rounded-lg bg-white p-6 shadow">
      <span className="mb-1 flex items-center text-xs text-text-terciary">
        from {formatDate(lecture.availableFrom)}
      </span>

      <h2 className="text-xl font-medium">{lecture.homeworkName}</h2>

      <TextPreview className="mt-3 line-clamp-5 grow">
        {lecture.homeworkPreview}
      </TextPreview>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end">
        <Suspense>
          <HomeworkCardActions lecture={lecture} />
        </Suspense>

        <div>
          <HomeworkPointsBadge
            maxPoints={lecture.homeworkMaxPoints}
            homework={homeworkPromise.then(homework =>
              homework.find(hw => hw.lectureId === lecture.id)
            )}
          />
        </div>
      </div>
    </article>
  );
};
