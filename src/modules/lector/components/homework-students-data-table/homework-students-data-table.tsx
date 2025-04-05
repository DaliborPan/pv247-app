import { DataTable } from '@/components/data-table';
import { getSessionUser } from '@/modules/session-user';
import { type LectureType } from '@/modules/lecture/schema';

import { type GetStudentsWithHomeworkLoaderResult } from '../../loader';

import { columns } from './columns';

export const HomeworkStudentsDataTable = async ({
  students,
  lecture
}: {
  students: GetStudentsWithHomeworkLoaderResult;
  lecture?: LectureType;
}) => {
  const sessionUser = await getSessionUser();

  return (
    <DataTable
      data={students.map(student => {
        const defaultValues = {
          lecture,
          lectorId: sessionUser.id,
          studentId: student.id,
          points: student.homeworksStudent.find(
            hw => hw.lectureId === lecture?.id
          )?.points
        };

        return {
          ...student,
          defaultValues
        };
      })}
      columns={columns}
    />
  );
};
