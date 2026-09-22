import { LectorChip } from '@/modules/lector/components/lector-chip';
import { getLecturesCachedQuery } from '@/modules/lecture/queries';
import type { LectureSlugType } from '@/modules/lecture/schema';

import { getLectureApprovedLectorsQuery } from '../queries';

export const LectureTeachers = async ({
  lectureSlug
}: {
  lectureSlug: Promise<LectureSlugType>;
}) => {
  const slug = await lectureSlug;
  const lectures = await getLecturesCachedQuery();
  const lecture = lectures.find(lecture => lecture.slug === slug);

  if (!lecture) return null;

  const lectureLectors = await getLectureApprovedLectorsQuery(lecture.id);

  if (lectureLectors.length === 0) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <span className="text-sm text-text-terciary">Teaching lecturers:</span>

      {lectureLectors.map(({ lector, ...lectureLector }) => (
        <LectorChip key={lectureLector.id} lector={lector} />
      ))}
    </div>
  );
};
