import { TabsContent } from '@/components/base/tabs';
import { getStudentsWithHomeworks } from '@/modules/student';
import { getMineStudents } from '@/modules/session-user';
import { StudentsDataTable, LectorTabsTable } from '@/modules/lector';

const Page = async () => {
  const lectorStudents = await getMineStudents();
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
            <StudentsDataTable students={await getStudentsWithHomeworks()} />
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
