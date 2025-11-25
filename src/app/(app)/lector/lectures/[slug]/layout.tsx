import { Suspense, type PropsWithChildren } from 'react';

import { LectureNavigation } from '@/modules/lecture/components/lecture-navigation';
import { type LectureSlugType } from '@/modules/lecture/schema';

const Layout = ({
  children,
  params
}: PropsWithChildren<{ params: Promise<{ slug: string }> }>) => {
  return (
    <>
      <Suspense>
        <LectureNavigation
          lectureSlug={params.then(params => params.slug as LectureSlugType)}
          baseHref="/lector/lectures"
        />
      </Suspense>

      <main className="mx-auto -mt-4 max-w-4xl lg:-mt-10">{children}</main>
    </>
  );
};

export default Layout;
