import { type PropsWithChildren } from 'react';

import { LectureNavigation } from '@/modules/lecture/components/lecture-navigation';
import { type LectureSlugType } from '@/modules/lecture/schema';

const Layout = async ({
  children,
  ...props
}: PropsWithChildren<{ params: Promise<{ slug: string }> }>) => {
  const params = await props.params;

  return (
    <>
      <LectureNavigation lectureSlug={params.slug as LectureSlugType} />

      <main className="mx-auto -mt-4 max-w-4xl lg:-mt-10">{children}</main>
    </>
  );
};
export default Layout;
