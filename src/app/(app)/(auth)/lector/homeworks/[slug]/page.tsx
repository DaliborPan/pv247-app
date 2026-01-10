import { redirect } from 'next/navigation';

import { TabsContent } from '@/components/base/tabs';
import { LabeledValue } from '@/components/labeled-value';
import { LectorTabsTable } from '@/modules/lector/components/lector-tabs-table';
import { HomeworkStudentsDataTable } from '@/modules/lector/components/homework-students-data-table';

import { getSessionUser } from '@/modules/session-user';
import { homeworkSlugSchema } from '@/modules/lecture/schema';

import { HomeworksNavigation } from './_components/homeworks-navigation';
import { lectureLoaders } from '@/modules/lecture/loader';
import { Suspense } from 'react';
import { studentLoaders } from '@/modules/student/loader';

const Page = ({ params }: PageProps<'/lector/homeworks/[slug]'>) => {
  return (
    <Suspense>
      {params.then(async ({ slug }) => {
        const parsedSlug = homeworkSlugSchema.safeParse(
          slug ?? homeworkSlugSchema.options[0]
        );

        if (!parsedSlug.success) {
          redirect('/');
        }

        const paramSlug = parsedSlug.data;

        const lectures = await lectureLoaders.getMany();
        const lecture = lectures.find(
          lecture => lecture.homeworkSlug === paramSlug
        );

        if (!lecture) {
          redirect('/');
        }

        const students = await studentLoaders.getStudentsWithHomework({
          lectureId: lecture.id
        });

        const sessionUser = await getSessionUser();
        const hasOwnStudents = students.some(
          student => student.lectorId === sessionUser.id
        );

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
                      <h2 className="text-xl text-text-primary-color">
                        {lecture?.homeworkName}
                      </h2>
                    </LabeledValue>
                  </div>

                  <HomeworksNavigation homeworkSlug={paramSlug} />
                </div>

                <TabsContent value="all">
                  <HomeworkStudentsDataTable
                    students={students}
                    lecture={lecture}
                  />
                </TabsContent>

                <TabsContent value="own">
                  <HomeworkStudentsDataTable
                    students={students.filter(
                      student => student.lectorId === sessionUser.id
                    )}
                    lecture={lecture}
                  />
                </TabsContent>
              </>
            }
          />
        );
      })}
    </Suspense>
  );
};

export default Page;
