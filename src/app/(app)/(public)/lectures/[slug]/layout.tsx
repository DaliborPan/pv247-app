import { LectureNavigation } from '@/modules/lecture/components/lecture-navigation';
import { type LectureSlugType } from '@/modules/lecture/schema';
import { Suspense } from 'react';

const Layout = ({ children, params }: LayoutProps<'/lectures/[slug]'>) => {
  return (
    <>
      <Suspense>
        <LectureNavigation
          lectureSlug={params.then(params => params.slug as LectureSlugType)}
        />
      </Suspense>

      <main className="mx-auto -mt-4 max-w-4xl lg:-mt-10">{children}</main>
    </>
  );
};
export default Layout;
