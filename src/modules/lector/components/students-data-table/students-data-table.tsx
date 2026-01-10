import { DataTable } from '@/components/data-table';

import { columns } from './columns';
import { LoaderResult } from '@/types';
import { type studentLoaders } from '@/modules/student/loader';

export const StudentsDataTable = ({
  students
}: {
  students: LoaderResult<typeof studentLoaders.getManyWithHomework>;
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
