import { DataTable } from '@/components/data-table';
import { type GetStudentsWithHomeworksResult } from '@/modules/student/server';

import { columns } from './columns';

export const StudentsDataTable = ({
  students
}: {
  students: GetStudentsWithHomeworksResult;
}) => (
  <DataTable
    data={students.map(student => ({
      ...student,
      homeworkPoints: student.homeworksStudent.reduce(
        (acc, hw) => acc + hw.points,
        0
      )
    }))}
    columns={columns}
  />
);
