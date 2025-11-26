import { StudentHomeworkCard } from '@/modules/student/components/student-homework-card';
import { StudentAttendanceCard } from '@/modules/student/components/student-attendance-card';
import { lectorLoaders } from '@/modules/lector/loader';

import { StudentHero, StudentDetailOverviewCard } from './_components';

const Page = ({ params }: PageProps<'/lector/student-detail/[id]'>) => {
  const studentPromise = lectorLoaders.getStudent(params.then(({ id }) => id));

  return (
    <div className="mx-auto mb-8 flex max-w-4xl flex-col gap-y-4">
      <StudentHero student={studentPromise} />
      <StudentDetailOverviewCard student={studentPromise} />
      <StudentHomeworkCard user={studentPromise} />
      <StudentAttendanceCard userId={studentPromise.then(user => user.id)} />
    </div>
  );
};

export default Page;
