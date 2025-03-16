import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { getSessionUser } from '@/modules/session-user/server';
import {
  addStudentLecture,
  getStudentLectures
} from '@/modules/student-lecture/server';
import { Button } from '@/components/base/button';
import { getOrderedLectures } from '@/modules/lecture/server';

const getLecture = async (token: string) => {
  const lectures = await getOrderedLectures();

  return lectures.find(lecture => lecture.attendanceToken === token);
};

const Page = async ({ params }: { params: { token: string } }) => {
  const user = await getSessionUser();
  const lecture = await getLecture(params.token);

  if (!lecture) {
    redirect('/');
  }

  const studentLecture = (
    await getStudentLectures({
      lectureId: lecture.id,
      studentId: user.id
    })
  ).at(0);

  if (!studentLecture) {
    await addStudentLecture({ studentId: user.id, lectureId: lecture.id });
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
