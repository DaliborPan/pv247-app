import { Suspense } from 'react';

import { DetailCard } from '@/components/detail-card';
import { getLecturesCachedQuery } from '@/modules/lecture/queries';
import { SetStudentAttendanceAction } from '@/modules/student-lecture/components/set-student-attendance-action/set-student-attendance-action';
import { getStudentLecturesQuery } from '@/modules/student-lecture/queries';

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

export const StudentAttendanceCard = async (props: {
  userId: Promise<string>;
}) => {
  const lectures = await getLecturesCachedQuery();

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
                <Suspense>
                  {props.userId.then(async userId => {
                    const attendances = await getStudentLecturesQuery(userId);

                    return (
                      <AttendanceCell
                        studentId={userId}
                        lectureId={lecture.id}
                        hasAttendance={attendances.some(
                          attendance => attendance.lectureId === lecture.id
                        )}
                      />
                    );
                  })}
                </Suspense>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DetailCard>
  );
};
