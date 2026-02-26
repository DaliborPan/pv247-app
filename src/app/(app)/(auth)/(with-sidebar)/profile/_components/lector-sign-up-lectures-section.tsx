import { DetailCard } from '@/components/detail-card';
import { getSessionUser } from '@/modules/session-user';
import { lectureLoaders } from '@/modules/lecture/loader';
import { SignOutLectureAction } from '@/modules/lecture-lector/components/sign-out-lecture-action';
import { SignUpLectureAction } from '@/modules/lecture-lector/components/sign-up-lecture-action';
import { SetLectureTeacherApprovalAction } from '@/modules/lecture-lector/components/set-lecture-teacher-approval-action';
import { lectureLectorLoaders } from '@/modules/lecture-lector/loader';
import { lectureLectorStatusOptions } from '@/modules/lecture-lector/schema';
import { getLectureLectorStatusLabel } from '@/modules/lecture-lector/utils';
import { cn } from '@/lib/cn';

import { getLectorDisplayName } from '@/modules/lector/utils/lector-display-name';
import { formatDate } from '@/lib/date';

export const LectorSignUpLecturesSection = async () => {
  const lectures = await lectureLoaders.getMany();
  const [sessionUser, lectorsByLectureId] = await Promise.all([
    getSessionUser(),
    lectureLectorLoaders.getLectorsForLectures()
  ]);

  return (
    <DetailCard title="Lecture sign-up">
      <div className="flex flex-col gap-4">
        {lectures.map(lecture => {
          const lectureLectors = lectorsByLectureId[lecture.id] ?? [];
          const isSignedUp = lectureLectors.some(
            lectorLecture => lectorLecture.lectorId === sessionUser.id
          );
          const approvedCount = lectureLectors.filter(
            lectureLector => lectureLector.isApproved
          ).length;

          return (
            <div
              key={lecture.id}
              className="border-border-primary bg-bg-secondary flex flex-col gap-3 rounded-xl border p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <span className="font-medium">{lecture.name}</span>
                  <span className="text-xs text-text-terciary">
                    Week of {formatDate(lecture.availableFrom)}
                  </span>
                </div>
                <div className="flex gap-2">
                  {isSignedUp ? (
                    <SignOutLectureAction lectureId={lecture.id} />
                  ) : (
                    <SignUpLectureAction lectureId={lecture.id} />
                  )}
                </div>
              </div>

              {lectureLectors.length > 0 ? (
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  {lectureLectorStatusOptions.map(statusOption => {
                    const lectorsByStatus = lectureLectors.filter(
                      lectureLector =>
                        lectureLector.status === statusOption.value
                    );

                    return (
                      <div
                        key={statusOption.value}
                        className="border-border-primary bg-bg-primary rounded-lg border p-3"
                      >
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <div className="text-sm font-medium">
                            {getLectureLectorStatusLabel(statusOption.value)}
                          </div>
                          <span className="text-xs text-text-terciary">
                            {lectorsByStatus.length}
                          </span>
                        </div>

                        {lectorsByStatus.length > 0 ? (
                          <div className="flex flex-col gap-2">
                            {lectorsByStatus.map(
                              ({ lector, ...lectureLector }) => (
                                <SetLectureTeacherApprovalAction
                                  key={lectureLector.id}
                                  lectureId={lecture.id}
                                  lectorId={lectureLector.lectorId}
                                  isApproved={lectureLector.isApproved}
                                  disabled={
                                    !lectureLector.isApproved &&
                                    approvedCount >= 2
                                  }
                                  className={cn(
                                    'border-border-primary flex items-center justify-between gap-2 rounded-md border px-2 py-1.5',
                                    lectureLector.isApproved
                                      ? 'border-green-300 bg-green-100/70'
                                      : 'bg-bg-secondary hover:bg-bg-primary'
                                  )}
                                >
                                  <div className="flex min-w-0 items-center gap-2">
                                    {lectureLector.isApproved && (
                                      <span className="size-2 shrink-0 rounded-full bg-green-600" />
                                    )}
                                    <span className="truncate text-sm">
                                      {getLectorDisplayName(lector)}
                                    </span>
                                  </div>
                                </SetLectureTeacherApprovalAction>
                              )
                            )}
                          </div>
                        ) : (
                          <div className="text-sm text-text-terciary">-</div>
                        )}
                      </div>
                    );
                  })}
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
