import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/base/button/button';
import { acceptAttendanceCodeSchema } from '@/modules/student-lecture/schema';

const Page = async ({ searchParams }: PageProps<'/accept-attendance'>) => {
  const parsedCode = acceptAttendanceCodeSchema.safeParse(
    (await searchParams).code
  );

  if (!parsedCode.success || parsedCode.data !== 'SUCCESS') {
    redirect('/');
  }

  return (
    <div className="container lg:mt-8">
      <h1 className="mb-4 text-2xl lg:text-5xl lg:font-light">
        Attendance accepted
      </h1>

      <p className="mb-6 text-sm text-text-secondary md:text-base">
        Your attendance has been accepted.
      </p>

      <Link href="/">
        <Button
          variant="outline/primary"
          iconLeft={{ icon: <ArrowLeft /> }}
          className="w-full lg:w-auto"
        >
          Back to home
        </Button>
      </Link>
    </div>
  );
};

export default Page;
