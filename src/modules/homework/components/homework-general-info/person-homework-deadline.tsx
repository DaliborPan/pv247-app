import { formatHomeworkDeadline } from '@/lib/date';
import { type LectureType } from '@/modules/lecture/types';

export const PersonHomeworkDeadline = ({
  lecture
}: {
  lecture: Pick<LectureType, 'availableFrom'>;
}) => <div>{formatHomeworkDeadline(lecture.availableFrom)}</div>;
