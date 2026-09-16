import { DetailCard } from '@/components/detail-card';
import { RevalidateLecturesAction } from '@/modules/lecture/components/revalidate-lecture-action';
import { getLecturesForAttendanceQuery } from '@/modules/lecture/queries';
import { ShowAttendanceQrCodeAction } from '@/modules/student-lecture/components/show-attendance-qr-code-action';

export const LectorLecturesSection = async () => {
  const lectures = await getLecturesForAttendanceQuery();

  return (
    <DetailCard
      title={
        <div className="flex items-center gap-x-4">
          <span>Lectures</span>
          <RevalidateLecturesAction />
        </div>
      }
    >
      <div className="grid gap-2 md:grid-cols-2">
        {lectures.map(lecture => (
          <div key={lecture.id} className="flex items-center gap-x-2">
            <ShowAttendanceQrCodeAction
              attendanceToken={lecture.attendanceToken}
            />

            <div className="ml-2 text-sm">{lecture.name}</div>
          </div>
        ))}
      </div>
    </DetailCard>
  );
};
