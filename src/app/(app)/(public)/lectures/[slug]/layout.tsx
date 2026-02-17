import { LectureNavigation } from '@/modules/lecture/components/lecture-navigation';
import { type LectureSlugType } from '@/modules/lecture/schema';
import { LectureTeachers } from '@/modules/lecture-lector/components/lecture-teachers';
import { Suspense } from 'react';

const Layout = ({ children, params }: LayoutProps<'/lectures/[slug]'>) => {
  const lectureSlug = params.then(p => p.slug as LectureSlugType);

  return (
    <>
      <Suspense>
        <LectureNavigation lectureSlug={lectureSlug} />
      </Suspense>

      <Suspense>
        <LectureTeachers lectureSlug={lectureSlug} />
      </Suspense>

      <main className="mx-auto -mt-4 max-w-4xl lg:-mt-10">{children}</main>
    </>
  );
};
export default Layout;
