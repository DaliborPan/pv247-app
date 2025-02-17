import { type PropsWithChildren } from 'react';

import { type LectureSlug } from '@/db';
import { LectureNavigation } from '@/modules/lecture/components/lecture-navigation';

const Layout = ({
  children,
  params
}: PropsWithChildren<{ params: { slug: LectureSlug } }>) => (
  <>
    <LectureNavigation lectureSlug={params.slug} />

    <main className="mx-auto -mt-4 max-w-4xl lg:-mt-10">{children}</main>
  </>
);

export default Layout;
