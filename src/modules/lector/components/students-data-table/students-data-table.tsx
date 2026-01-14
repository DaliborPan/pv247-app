import { DataTable } from '@/components/data-table';

import { columns } from './columns';
import { LoaderResult } from '@/types';
import { type studentLoaders } from '@/modules/student/loader';

export const StudentsDataTable = ({
  students
}: {
  students: LoaderResult<typeof studentLoaders.listStudents>;
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
