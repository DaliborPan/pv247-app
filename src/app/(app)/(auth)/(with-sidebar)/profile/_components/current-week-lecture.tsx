import { Button } from '@/components/base/button/button';
import { formatDate } from '@/lib/date';
import { type LectureAttendanceType } from '@/modules/lecture/types';
import { ShowAttendanceQrCodeAction } from '@/modules/student-lecture/components/show-attendance-qr-code-action/show-attendance-qr-code-action';

const getCurrentWeekLecture = (lectures: LectureAttendanceType[]) => {
  const now = new Date();
  const startOfWeek = new Date(now);
  const day = startOfWeek.getDay();

  startOfWeek.setDate(startOfWeek.getDate() - (day === 0 ? 6 : day - 1));
  startOfWeek.setHours(0, 0, 0, 0);

  const startOfNextWeek = new Date(startOfWeek);
  startOfNextWeek.setDate(startOfNextWeek.getDate() + 7);

  return lectures.find(lecture => {
    const lectureDate = new Date(lecture.availableFrom);

    return lectureDate >= startOfWeek && lectureDate < startOfNextWeek;
  });
};

export const CurrentWeekLecture = ({
  lectures
}: {
  lectures: LectureAttendanceType[];
}) => {
  const currentWeekLecture = getCurrentWeekLecture(lectures);

  return (
    <div className="border-border-primary bg-bg-secondary mb-5 flex flex-wrap items-center justify-between gap-5 rounded-xl border p-4 md:p-5">
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wide text-text-terciary">
          Current week
        </p>
        {currentWeekLecture ? (
          <p className="text-lg font-medium">
            {currentWeekLecture.name} (
            {formatDate(currentWeekLecture.availableFrom)})
          </p>
        ) : (
          <p className="text-lg font-medium">
            No lecture is scheduled this week.
          </p>
        )}
      </div>

      {currentWeekLecture && (
        <ShowAttendanceQrCodeAction
          attendanceToken={currentWeekLecture.attendanceToken}
        >
          <Button variant="outline/primary">Show attendance QR</Button>
        </ShowAttendanceQrCodeAction>
      )}
    </div>
  );
};
