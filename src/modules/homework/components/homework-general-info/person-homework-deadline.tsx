import { formatDate } from '@/lib/date';
import { type LectureType } from '@/modules/lecture/schema';

export const PersonHomeworkDeadline = ({
  lecture
}: {
  lecture: LectureType;
}) => <div>{formatDate(lecture.homeworkDeadline)}</div>;
