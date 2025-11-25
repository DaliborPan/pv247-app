import { formatDate } from '@/lib/date';
import { TextPreview } from '@/components/text-preview';

import { type LectureType } from '../schema';

import { HomeworkPointsBadge } from './homework-points-badge';
import { HomeworkType } from '@/modules/homework/schema';
import { HomeworkCardActions } from './homework-card-actions';

export const HomeworkCard = ({
  lecture,
  homework
}: {
  lecture: LectureType;
  homework?: Promise<HomeworkType | undefined>;
}) => {
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
        <HomeworkCardActions lecture={lecture} />

        <div>
          <HomeworkPointsBadge
            maxPoints={lecture.homeworkMaxPoints}
            homework={homework}
          />
        </div>
      </div>
    </article>
  );
};
