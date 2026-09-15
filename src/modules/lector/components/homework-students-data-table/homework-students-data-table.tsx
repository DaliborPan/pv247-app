import { DataTable } from '@/components/data-table';
import { getSessionUser } from '@/modules/session-user';
import { type LectureType } from '@/modules/lecture/types';

import { type studentLoaders } from '@/modules/student/loader';

import { columns } from './columns';
import { LoaderResult } from '@/types';

export const HomeworkStudentsDataTable = async ({
  students,
  lecture
}: {
  students: LoaderResult<typeof studentLoaders.getStudentsWithHomework>;
  lecture?: Pick<
    LectureType,
    'id' | 'homeworkName' | 'homeworkSlug' | 'homeworkTemplateRepositoryUrl'
  >;
}) => {
  const sessionUser = await getSessionUser();

  return (
    <DataTable
      data={students.map(student => {
        const defaultValues = {
          lecture: lecture
            ? {
                id: lecture.id,
                homeworkName: lecture.homeworkName,
                homeworkSlug: lecture.homeworkSlug
              }
            : undefined,
          lectorId: sessionUser.id,
          studentId: student.id,
          points: student.homeworksStudent.find(
            hw => hw.lectureId === lecture?.id
          )?.points
        };

        return {
          ...student,
          templateRepositoryUrl: lecture?.homeworkTemplateRepositoryUrl,
          defaultValues
        };
      })}
      columns={columns}
    />
  );
};
