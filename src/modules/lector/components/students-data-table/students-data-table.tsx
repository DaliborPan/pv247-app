import { DataTable } from '@/components/data-table/data-table';
import { type StudentProgressType } from '@/modules/student/types';

import { columns } from './columns';

export const StudentsDataTable = ({
  students
}: {
  students: StudentProgressType[];
}) => (
  <DataTable
    data={students}
    search={{
      name: 'fullname'
    }}
    defaultSorting={[
      {
        id: 'lastName',
        desc: false
      }
    ]}
    defaultColumnVisibility={{
      fullname: false
    }}
    columns={columns}
  />
);
