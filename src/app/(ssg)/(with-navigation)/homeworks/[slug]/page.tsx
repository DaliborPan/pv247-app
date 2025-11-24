import { redirect } from 'next/navigation';

import { getHomeworkMdxComponent } from '@/modules/homework/mdx';
import { lectureLoaders } from '@/modules/lecture/loader';
import {
  homeworkSlugSchema,
  type HomeworkSlugType
} from '@/modules/lecture/schema';
import { Suspense } from 'react';

export const generateStaticParams = () => {
  const slugs = homeworkSlugSchema.options;

  return slugs.filter(slug => slug !== '').map(slug => ({ slug }));
};

const PageAsync = async (props: { slug: Promise<HomeworkSlugType> }) => {
  const slug = await props.slug;
  const isAvailable = await lectureLoaders.getIsHomeworkAvailable(slug);

  if (!isAvailable) {
    redirect('/homeworks');
  }

  const MdxComponent = getHomeworkMdxComponent(slug);

  return <MdxComponent />;
};

const Page = ({ params }: PageProps<'/homeworks/[slug]'>) => {
  return (
    <Suspense>
      <PageAsync
        slug={params.then(params => params.slug as HomeworkSlugType)}
      />
    </Suspense>
  );
};
export default Page;
