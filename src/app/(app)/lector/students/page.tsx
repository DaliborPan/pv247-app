import { TabsContent } from '@/components/base/tabs';
import { LectorTabsTable } from '@/modules/lector/components/lector-tabs-table';
import { StudentsDataTable } from '@/modules/lector/components/students-data-table';
import {
  getMineStudentsLoader,
  getStudentsWithHomeworkLoader
} from '@/modules/lector/server/loader';

const Page = async () => {
  const lectorStudents = await getMineStudentsLoader();
  const hasOwnStudents = !!lectorStudents.length;

  return (
    <LectorTabsTable
      title="Students"
      triggers={
        !hasOwnStudents
          ? []
          : [
              {
                href: '/lector/students?type=all',
                label: 'All students',
                value: 'all'
              },
              {
                href: '/lector/students?type=own',
                label: 'Own students',
                value: 'own'
              }
            ]
      }
      contents={
        <>
          <TabsContent value="all">
            <StudentsDataTable
              students={await getStudentsWithHomeworkLoader()}
            />
          </TabsContent>

          <TabsContent value="own">
            <StudentsDataTable students={lectorStudents} />
          </TabsContent>
        </>
      }
    />
  );
};

export default Page;
