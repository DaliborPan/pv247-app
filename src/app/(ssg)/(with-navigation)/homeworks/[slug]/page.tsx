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

const Page = async (props: PageProps<'/homeworks/[slug]'>) => {
  const params = await props.params;
  const isAvailable = await lectureLoaders.getIsHomeworkAvailable(params.slug);

  if (!isAvailable) {
    redirect('/homeworks');
  }

  const MdxComponent = getHomeworkMdxComponent(params.slug as HomeworkSlugType);

  return <MdxComponent />;
};

export default Page;
