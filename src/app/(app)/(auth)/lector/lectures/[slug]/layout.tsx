import { Suspense, type PropsWithChildren } from 'react';

import { LectureNavigation } from '@/modules/lecture/components/lecture-navigation';
import { type LectureSlugType } from '@/modules/lecture/schema';
import { LectureTeachers } from '@/modules/lecture-lector/components/lecture-teachers';

const Layout = ({
  children,
  params
}: PropsWithChildren<{ params: Promise<{ slug: string }> }>) => {
  const lectureSlug = params.then(p => p.slug as LectureSlugType);

  return (
    <>
      <Suspense>
        <LectureNavigation
          lectureSlug={lectureSlug}
          baseHref="/lector/lectures"
        />
      </Suspense>

      <Suspense>
        <LectureTeachers lectureSlug={lectureSlug} />
      </Suspense>

      <main className="mx-auto -mt-4 max-w-4xl lg:-mt-10">{children}</main>
    </>
  );
};

export default Layout;
