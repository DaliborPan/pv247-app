import { redirect } from 'next/navigation';

import { getHomeworkMdxComponent } from '@/modules/homework/mdx';
import { getIsHomeworkAvailableLoader } from '@/modules/lecture/loader';
import {
  homeworkSlugSchema,
  type HomeworkSlugType
} from '@/modules/lecture/schema';

type Params = {
  slug: string;
};

export const generateStaticParams = (): Params[] => {
  const slugs = homeworkSlugSchema.options;

  return slugs.filter(slug => slug !== '').map(slug => ({ slug }));
};

const Page = async (props: { params: Promise<Params> }) => {
  const params = await props.params;
  const isAvailable = await getIsHomeworkAvailableLoader(params.slug);

  if (!isAvailable) {
    redirect('/homeworks');
  }

  const MdxComponent = getHomeworkMdxComponent(params.slug as HomeworkSlugType);

  return <MdxComponent />;
};

export default Page;
