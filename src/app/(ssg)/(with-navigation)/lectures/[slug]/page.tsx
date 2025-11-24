import { redirect } from 'next/navigation';

import { lectureLoaders } from '@/modules/lecture/loader';
import { getLectureMdxComponent } from '@/modules/lecture/mdx';
import {
  lectureSlugSchema,
  type LectureSlugType
} from '@/modules/lecture/schema';
import { Suspense } from 'react';

export const generateStaticParams = () => {
  const lectures = lectureSlugSchema.options;

  return lectures.map(slug => ({ slug }));
};

const PageAsync = async (props: { slug: Promise<LectureSlugType> }) => {
  const slug = await props.slug;

  const isAvailable = await lectureLoaders.getIsAvailable(slug);

  if (!isAvailable) {
    redirect('/lectures');
  }

  const MdxComponent = getLectureMdxComponent(slug);

  return <MdxComponent />;
};

const Page = ({ params }: PageProps<'/lectures/[slug]'>) => {
  return (
    <Suspense>
      <PageAsync slug={params.then(params => params.slug as LectureSlugType)} />
    </Suspense>
  );
};

export default Page;
