import { DataTable } from '@/components/data-table/data-table';
import { type LectureType } from '@/modules/lecture/types';

import { type StudentHomeworkStudentType } from '@/modules/student/types';

import { columns } from './columns';

export const HomeworkStudentsDataTable = async ({
  students,
  lecture
}: {
  students: StudentHomeworkStudentType[];
  lecture: Pick<LectureType, 'id'>;
}) => {
  return (
    <DataTable
      data={students.map(student => {
        const defaultValues = {
          lectureId: lecture.id,
          studentId: student.id,
          points:
            student.studentHomeworks.find(hw => hw.lectureId === lecture.id)
              ?.points ?? undefined
        };
        const studentHomework = student.studentHomeworks.find(
          homework => homework.lectureId === lecture.id
        );

        return {
          ...student,
          repositoryUrl:
            studentHomework?.status === 'ready'
              ? studentHomework.repositoryUrl
              : undefined,
          canGrade: studentHomework?.status === 'ready',
          defaultValues
        };
      })}
      columns={columns}
    />
  );
};
