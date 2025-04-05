import { redirect } from 'next/navigation';

import { getHomeworkMdxComponent } from '@/modules/homework/mdx';
import { getIsHomeworkAvailableLoader } from '@/modules/lecture/loader';
import {
  homeworkSlugSchema,
  type HomeworkSlugType
} from '@/modules/lecture/schema';

type Params = {
  slug: HomeworkSlugType;
};

export const generateStaticParams = (): Params[] => {
  const slugs = homeworkSlugSchema.options;

  return slugs.filter(slug => slug !== '').map(slug => ({ slug }));
};

const Page = async ({ params }: { params: Params }) => {
  const isAvailable = await getIsHomeworkAvailableLoader(params.slug);

  if (!isAvailable) {
    redirect('/homeworks');
  }

  const MdxComponent = getHomeworkMdxComponent(params.slug);

  return <MdxComponent />;
};

export default Page;
