import { redirect } from 'next/navigation';

import { homeworkSlugSchema } from '@/db';
import { TabsContent } from '@/components/base/tabs';
import { LabeledValue } from '@/components/labeled-value';
import { getMineStudents } from '@/modules/session-user/server';
import { getStudentsWithHomeworks } from '@/modules/student/server';
import { LectorTabsTable } from '@/modules/lector/components/lector-tabs-table';
import { HomeworkStudentsDataTable } from '@/modules/lector/components/homework-students-data-table';
import { getOrderedLectures } from '@/modules/lecture/server';

import { HomeworksNavigation } from './_components';

const Page = async ({
  params
}: {
  params: {
    slug: string;
  };
}) => {
  const parsedSlug = homeworkSlugSchema.safeParse(
    params.slug ?? homeworkSlugSchema.options[0]
  );

  if (!parsedSlug.success) {
    redirect('/');
  }

  const paramSlug = parsedSlug.data;

  const lectorStudents = await getMineStudents();
  const hasOwnStudents = !!lectorStudents.length;

  const lectures = await getOrderedLectures();
  const lecture = lectures.find(lecture => lecture.homeworkSlug === paramSlug);

  return (
    <LectorTabsTable
      title="Homework evaluation"
      triggers={
        !hasOwnStudents
          ? []
          : [
              {
                href: `/lector/homeworks/${paramSlug}?type=all`,
                label: 'All students',
                value: 'all'
              },
              {
                href: `/lector/homeworks/${paramSlug}?type=own`,
                label: 'My students',
                value: 'own'
              }
            ]
      }
      contents={
        <>
          <div className="mb-4 flex items-center rounded-lg bg-gray-50 py-2 pl-4 shadow">
            <div className="grow">
              <LabeledValue label="Name">
                <h2 className="text-2xl text-primary">
                  {lecture?.homeworkName}
                </h2>
              </LabeledValue>
            </div>

            <HomeworksNavigation homeworkSlug={paramSlug} />
          </div>

          <TabsContent value="all">
            <HomeworkStudentsDataTable
              students={await getStudentsWithHomeworks()}
              lecture={lecture}
            />
          </TabsContent>

          <TabsContent value="own">
            <HomeworkStudentsDataTable
              students={lectorStudents}
              lecture={lecture}
            />
          </TabsContent>
        </>
      }
    />
  );
};

export default Page;
