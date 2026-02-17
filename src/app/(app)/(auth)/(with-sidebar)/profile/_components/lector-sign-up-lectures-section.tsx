import { DetailCard } from '@/components/detail-card';
import { getSessionUser } from '@/modules/session-user';
import { lectureLoaders } from '@/modules/lecture/loader';
import { SignOutLectureAction } from '@/modules/lecture-lector/components/sign-out-lecture-action';
import { SignUpLectureAction } from '@/modules/lecture-lector/components/sign-up-lecture-action';
import { lectureLectorQueries } from '@/modules/lecture-lector/server';
import { lectureLectorLoaders } from '@/modules/lecture-lector/loader';

const getLectorDisplayName = (ll: {
  lector?: {
    firstName?: string | null;
    lastName?: string | null;
    name?: string;
  } | null;
}) => {
  const lector = ll.lector;
  if (!lector) return 'Lektor';
  if (lector.firstName && lector.lastName) {
    return `${lector.firstName} ${lector.lastName}`;
  }
  return lector.name ?? 'Lektor';
};

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
                    <span
                      key={lectureLector.id}
                      className="border-border-primary bg-bg-terciary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
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
                        <span className="bg-bg-secondary flex h-5 w-5 items-center justify-center rounded-full text-xs text-text-secondary">
                          {(lector.name ?? lector.firstName ?? '?')[0]}
                        </span>
                      )}
                      {getLectorDisplayName({ lector })}
                    </span>
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
