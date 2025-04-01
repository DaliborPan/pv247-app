import { DataTable } from '@/components/data-table';

import { type GetStudentsWithHomeworkLoaderResult } from '../../server/loader';

import { columns } from './columns';

export const StudentsDataTable = ({
  students
}: {
  students: GetStudentsWithHomeworkLoaderResult;
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
