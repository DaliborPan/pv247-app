import { DataTable } from '@/components/data-table/data-table';
import { getSessionUser } from '@/modules/session-user/session-user';
import { type LectureType } from '@/modules/lecture/types';

import { type StudentHomeworkType } from '@/modules/student/types';

import { columns } from './columns';

export const HomeworkStudentsDataTable = async ({
  students,
  lecture
}: {
  students: StudentHomeworkType[];
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
