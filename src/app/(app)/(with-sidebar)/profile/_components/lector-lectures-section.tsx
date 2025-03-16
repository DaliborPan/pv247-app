import { DetailCard } from '@/components/detail-card';
import { RevalidateLectureAction } from '@/modules/lecture/components/revalidate-lecture-action';
import { getOrderedLectures } from '@/modules/lecture/server';
import { ShowAttendanceQrCodeAction } from '@/modules/student-lecture/components/show-attendance-qr-code-action';

export const LectorLecturesSection = async () => {
  const lectures = await getOrderedLectures();

  return (
    <DetailCard title="Lectures">
      <div className="grid gap-2 md:grid-cols-2">
        {lectures.map(lecture => (
          <div key={lecture.id} className="flex items-center gap-x-2">
            <RevalidateLectureAction lecture={lecture} />
            <ShowAttendanceQrCodeAction lecture={lecture} />

            <div className="ml-2 text-sm">{lecture.name}</div>
          </div>
        ))}
      </div>
    </DetailCard>
  );
};
