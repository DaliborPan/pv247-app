import { formatDate } from '@/lib/date';
import { type LectureType } from '@/modules/lecture/types';

export const PersonHomeworkDeadline = ({
  lecture
}: {
  lecture: Pick<LectureType, 'homeworkDeadline'>;
}) => <div>{formatDate(lecture.homeworkDeadline)}</div>;
