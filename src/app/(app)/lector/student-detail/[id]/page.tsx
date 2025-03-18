import { redirect } from 'next/navigation';

import { StudentHomeworkCard } from '@/modules/student/components/student-homework-card';
import { getStudent } from '@/modules/student/server';
import { StudentAttendanceCard } from '@/modules/student/components/student-attendance-card';

import { StudentHero, StudentDetailOverviewCard } from './_components';

const Page = async ({ params }: { params: { id: string } }) => {
  const student = await getStudent(params.id);

  if (!student) {
    redirect('/lector');
  }

  return (
    <div className="mx-auto mb-8 flex max-w-4xl flex-col gap-y-4">
      <StudentHero student={student} />
      <StudentDetailOverviewCard student={student} />
      <StudentHomeworkCard userId={student.id} projectId={student.projectId} />
      <StudentAttendanceCard userId={student.id} />
    </div>
  );
};

export default Page;
