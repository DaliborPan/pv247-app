import { DataTable } from '@/components/data-table';

import { columns } from './columns';
import { LoaderResult } from '@/types';
import { type studentLoaders } from '@/modules/student/loader';
import { type homeworkLoader } from '@/modules/homework/loader';

type StudentWithHomeworks = LoaderResult<
  typeof studentLoaders.getMany
>[number] & {
  homeworksStudent: LoaderResult<typeof homeworkLoader.getMany>[number][];
};

export const StudentsDataTable = ({
  students
}: {
  students: StudentWithHomeworks[];
}) => (
  <DataTable
    data={students.map(student => ({
      ...student,
      homeworkPoints: student.homeworksStudent.reduce(
        (acc, hw) => acc + hw.points,
        0
      )
    }))}
    search={{
      name: 'fullname'
    }}
    columns={columns}
  />
);
