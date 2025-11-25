import { redirect } from 'next/navigation';

import { getHomeworkMdxComponent } from '@/modules/homework/mdx';
import { lectureLoaders } from '@/modules/lecture/loader';
import {
  homeworkSlugSchema,
  type HomeworkSlugType
} from '@/modules/lecture/schema';

export const generateStaticParams = () => {
  const slugs = homeworkSlugSchema.options;

  return slugs.filter(slug => slug !== '').map(slug => ({ slug }));
};

const Page = async ({ params }: PageProps<'/homeworks/[slug]'>) => {
  const slug = (await params).slug as HomeworkSlugType;
  const isAvailable = await lectureLoaders.getIsHomeworkAvailable(slug);

  if (!isAvailable) {
    redirect('/homeworks');
  }

  const MdxComponent = getHomeworkMdxComponent(slug);

  return <MdxComponent />;
};

export default Page;
