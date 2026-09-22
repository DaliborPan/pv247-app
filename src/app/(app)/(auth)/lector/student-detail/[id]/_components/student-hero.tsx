import { Suspense } from 'react';

import { Hero } from '@/components/base/hero';
import { type StudentType } from '@/modules/student/types';

export const StudentHero = ({ student }: { student: Promise<StudentType> }) => (
  <Hero>
    <div className="size-20 rounded-full bg-gradient-to-tr from-primary-100 to-primary-300 shadow" />
    <div>
      <Suspense>
        {student.then(student => {
          const displayName = student.firstName
            ? `${student.firstName} ${student.lastName}`
            : student.name;

          return <div className="text-2xl font-medium">{displayName}</div>;
        })}
      </Suspense>

      <div className="text-sm text-text-terciary">Course student</div>
    </div>
  </Hero>
);
