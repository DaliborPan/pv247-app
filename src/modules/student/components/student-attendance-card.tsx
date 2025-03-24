import { DetailCard } from '@/components/detail-card';
import { getOrderedLecturesLoader } from '@/modules/lecture/server';
import { SetStudentAttendanceAction } from '@/modules/student-lecture/components/set-student-attendance-action';
import { getStudentLecturesLoader } from '@/modules/student-lecture/server';

const AttendanceCell = ({
  studentId,
  lectureId,
  hasAttendance
}: {
  studentId: string;
  lectureId: string;
  hasAttendance: boolean;
}) => (
  <div className="flex items-center gap-x-2">
    {hasAttendance && <span className="text-sm">Attended</span>}

    <SetStudentAttendanceAction
      studentId={studentId}
      lectureId={lectureId}
      hasAttendance={hasAttendance}
    />
  </div>
);

export const StudentAttendanceCard = async ({ userId }: { userId: string }) => {
  const lectures = await getOrderedLecturesLoader();
  const attendances = await getStudentLecturesLoader({ userId });

  return (
    <DetailCard title="Attendance">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left font-medium">Lecture</th>
            <th className="py-2 text-left font-medium">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {lectures.map((lecture, index) => (
            <tr key={lecture.id} className="border-b">
              <td className="py-2 font-light">
                {index + 1}. {lecture.name}
              </td>

              <td className="py-2">
                <AttendanceCell
                  studentId={userId}
                  lectureId={lecture.id}
                  hasAttendance={attendances.some(
                    attendance => attendance.lectureId === lecture.id
                  )}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DetailCard>
  );
};
