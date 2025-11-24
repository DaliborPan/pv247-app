import { redirect } from 'next/navigation';

import { lectureLoaders } from '@/modules/lecture/loader';
import { getLectureMdxComponent } from '@/modules/lecture/mdx';
import {
  lectureSlugSchema,
  type LectureSlugType
} from '@/modules/lecture/schema';

export const generateStaticParams = () => {
  const lectures = lectureSlugSchema.options;

  return lectures.map(slug => ({ slug }));
};

const Page = async (props: PageProps<'/lectures/[slug]'>) => {
  const params = await props.params;
  const isAvailable = await lectureLoaders.getIsAvailable(params.slug);

  if (!isAvailable) {
    redirect('/lectures');
  }

  const MdxComponent = getLectureMdxComponent(params.slug as LectureSlugType);

  return <MdxComponent />;
};

export default Page;
