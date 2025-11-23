import { StudentHomeworkCard } from '@/modules/student/components/student-homework-card';
import { StudentAttendanceCard } from '@/modules/student/components/student-attendance-card';
import { getStudentLoader } from '@/modules/lector/loader';

import { StudentHero, StudentDetailOverviewCard } from './_components';

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const student = await getStudentLoader(params.id);

  return (
    <div className="mx-auto mb-8 flex max-w-4xl flex-col gap-y-4">
      <StudentHero student={student} />
      <StudentDetailOverviewCard student={student} />
      <StudentHomeworkCard user={student} />
      <StudentAttendanceCard userId={student.id} />
    </div>
  );
};

export default Page;
