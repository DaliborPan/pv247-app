import { DataTable } from '@/components/data-table';
import { getSessionUser } from '@/modules/session-user';
import { type LectureType } from '@/modules/lecture/schema';

import { type studentLoaders } from '@/modules/student/loader';

import { columns } from './columns';
import { LoaderResult } from '@/types';

export const HomeworkStudentsDataTable = async ({
  students,
  lecture
}: {
  students: LoaderResult<typeof studentLoaders.getManyWithHomework>;
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
