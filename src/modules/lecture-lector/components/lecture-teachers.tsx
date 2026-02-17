import { lectureLoaders } from '@/modules/lecture/loader';
import type { LectureSlugType } from '@/modules/lecture/schema';

import { lectureLectorLoaders } from '../loader';

export const LectureTeachers = async ({
  lectureSlug
}: {
  lectureSlug: Promise<LectureSlugType>;
}) => {
  const slug = await lectureSlug;
  const lectures = await lectureLoaders.getMany();
  const lecture = lectures.find(lecture => lecture.slug === slug);

  if (!lecture) return null;

  const lectureLectors = await lectureLectorLoaders.getLectureLectors(
    lecture.id
  );

  if (lectureLectors.length === 0) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <span className="text-sm text-text-terciary">Lecturers:</span>

      {lectureLectors.map(({ lector, ...lectureLector }) => (
        <div
          key={lectureLector.id}
          className="border-border-primary bg-bg-secondary flex items-center gap-2 rounded-lg border px-3 py-2"
        >
          {lector.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={lector.image}
              alt=""
              width={20}
              height={20}
              className="size-5 rounded-full object-cover"
            />
          ) : (
            <div className="bg-bg-terciary flex size-6 items-center justify-center rounded-full text-xs text-text-secondary">
              {(lector.name ?? lector.firstName ?? '?')[0]}
            </div>
          )}
          <span className="text-sm">
            {lector.firstName && lector.lastName
              ? `${lector.firstName} ${lector.lastName}`
              : lector.name ?? 'Lektor'}
          </span>
        </div>
      ))}
    </div>
  );
};
