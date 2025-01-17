import { type PropsWithChildren } from 'react';

import { type LectureSlug } from '@/db';
import { LectureNavigation } from '@/modules/lecture';

const Layout = ({
  children,
  params
}: PropsWithChildren<{ params: { slug: LectureSlug } }>) => (
  <>
    <LectureNavigation lectureSlug={params.slug} />

    <main className="max-w-4xl mx-auto -mt-4 lg:-mt-10">{children}</main>
  </>
);

export default Layout;
