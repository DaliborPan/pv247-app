import { TabsContent } from '@/components/base/tabs';
import { LectorTabsTable } from '@/modules/lector/components/lector-tabs-table';
import { StudentsDataTable } from '@/modules/lector/components/students-data-table';
import { lectorLoaders } from '@/modules/lector/loader';
import { getSessionUser } from '@/modules/session-user';

const Page = async () => {
  const students = await lectorLoaders.getStudentsWithHomework();

  const sessionUser = await getSessionUser();
  const hasOwnStudents = students.some(
    student => student.lectorId === sessionUser.id
  );

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
            <StudentsDataTable students={students} />
          </TabsContent>

          <TabsContent value="own">
            <StudentsDataTable
              students={students.filter(
                student => student.lectorId === sessionUser.id
              )}
            />
          </TabsContent>
        </>
      }
    />
  );
};

export default Page;
