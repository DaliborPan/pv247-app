import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { getSessionUser } from '@/modules/session-user';
import { addStudentLectureMutation } from '@/modules/student-lecture/server';
import { Button } from '@/components/base/button';
import { getOrderedLecturesLoader } from '@/modules/lecture/loader';
import { getMineStudentLecturesLoader } from '@/modules/student-lecture/loader';

const Page = async ({ params }: { params: { token: string } }) => {
  const lectures = await getOrderedLecturesLoader();
  const lecture = lectures.find(
    lecture => lecture.attendanceToken === params.token
  );

  if (!lecture) {
    redirect('/');
  }

  const studentLecture = (
    await getMineStudentLecturesLoader({ lectureId: lecture.id })
  ).at(0);

  if (!studentLecture) {
    const sessionUser = await getSessionUser();

    // special case of calling mutation inside RSC
    await addStudentLectureMutation(sessionUser, {
      studentId: sessionUser.id,
      lectureId: lecture.id
    });
  }

  return (
    <>
      <h1 className="mb-4 text-2xl lg:text-5xl lg:font-light">
        Attendance accepted
      </h1>

      <p className="mb-6 text-sm text-text-secondary md:text-base">
        Your attendance has been accepted for lecture{' '}
        <span className="font-medium text-text-primary-color">
          {lecture.name}
        </span>
        .
      </p>

      <Link href={`/lectures/${lecture.slug}`}>
        <Button
          variant="outline/primary"
          iconRight={{ icon: <ArrowRight /> }}
          className="w-full lg:w-auto"
        >
          Start learning
        </Button>
      </Link>
    </>
  );
};

export default Page;
