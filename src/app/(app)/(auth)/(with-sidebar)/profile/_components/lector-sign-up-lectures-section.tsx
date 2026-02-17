import { DetailCard } from '@/components/detail-card';
import { getSessionUser } from '@/modules/session-user';
import { lectureLoaders } from '@/modules/lecture/loader';
import { SignOutLectureAction } from '@/modules/lecture-lector/components/sign-out-lecture-action';
import { SignUpLectureAction } from '@/modules/lecture-lector/components/sign-up-lecture-action';
import { lectureLectorLoaders } from '@/modules/lecture-lector/loader';

import { LectorChip } from '@/modules/lector/components/lector-chip';

export const LectorSignUpLecturesSection = async () => {
  const lectures = await lectureLoaders.getMany();
  const [sessionUser, lectorsByLectureId] = await Promise.all([
    getSessionUser(),
    lectureLectorLoaders.getLectorsForLectures()
  ]);

  return (
    <DetailCard title="Přihlášení na lekce">
      <div className="flex flex-col gap-4">
        {lectures.map(lecture => {
          const lectureLectors = lectorsByLectureId[lecture.id] ?? [];
          const isSignedUp = lectureLectors.some(
            lectorLecture => lectorLecture.lectorId === sessionUser.id
          );
          const isFull = lectureLectors.length >= 2;

          return (
            <div
              key={lecture.id}
              className="border-border-primary bg-bg-secondary flex flex-col gap-2 rounded-lg border p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-medium">{lecture.name}</span>
                <div className="flex gap-2">
                  {isSignedUp ? (
                    <SignOutLectureAction lectureId={lecture.id} />
                  ) : (
                    <SignUpLectureAction
                      lectureId={lecture.id}
                      disabled={isFull}
                    />
                  )}
                </div>
              </div>

              {lectureLectors.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {lectureLectors.map(({ lector, ...lectureLector }) => (
                    <LectorChip key={lectureLector.id} lector={lector} />
                  ))}
                </div>
              ) : (
                <div className="text-sm text-text-terciary">
                  No one is signed up yet.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </DetailCard>
  );
};
