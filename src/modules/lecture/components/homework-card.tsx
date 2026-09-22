import { TextPreview } from '@/components/text-preview';
import { formatDate } from '@/lib/date';
import { type LectureType } from '@/modules/lecture/types';
import { getMyHomeworksQuery } from '@/modules/student-homework/queries';

import { HomeworkCardActions } from './homework-card-actions';
import { HomeworkPointsBadge } from './homework-points-badge';

export const HomeworkCard = ({ lecture }: { lecture: LectureType }) => (
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
        {/* Potential ppr problem? */}
        <HomeworkPointsBadge
          maxPoints={lecture.homeworkMaxPoints}
          studentHomework={getMyHomeworksQuery().then(studentHomeworks =>
            studentHomeworks.find(
              studentHomework => studentHomework.lectureId === lecture.id
            )
          )}
        />
      </div>
    </div>
  </article>
);
