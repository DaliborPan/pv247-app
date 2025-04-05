import { type PropsWithChildren } from 'react';

import { LectureNavigation } from '@/modules/lecture/components/lecture-navigation';
import { type LectureSlugType } from '@/modules/lecture/schema';

const Layout = ({
  children,
  params
}: PropsWithChildren<{ params: { slug: LectureSlugType } }>) => (
  <>
    <LectureNavigation lectureSlug={params.slug} baseHref="/lector/lectures" />

    <main className="mx-auto -mt-4 max-w-4xl lg:-mt-10">{children}</main>
  </>
);

export default Layout;
