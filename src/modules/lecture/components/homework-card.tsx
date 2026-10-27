import { OverviewCard } from '@/components/overview-card';
import { formatDate } from '@/lib/date';
import { type LectureType } from '@/modules/lecture/types';
import { getMyHomeworksQuery } from '@/modules/student-homework/queries';

import { HomeworkCardActions } from './homework-card-actions';
import { HomeworkPointsBadge } from './homework-points-badge';

export const HomeworkCard = ({ lecture }: { lecture: LectureType }) => (
  <OverviewCard>
    <OverviewCard.Meta>
      from {formatDate(lecture.availableFrom)}
    </OverviewCard.Meta>

    <OverviewCard.Title>{lecture.homeworkName}</OverviewCard.Title>

    <OverviewCard.Description>
      {lecture.homeworkPreview}
    </OverviewCard.Description>

    <OverviewCard.Footer>
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
    </OverviewCard.Footer>
  </OverviewCard>
);
