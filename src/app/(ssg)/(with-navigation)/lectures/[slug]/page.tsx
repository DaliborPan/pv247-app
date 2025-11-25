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

const Page = async ({ params }: PageProps<'/lectures/[slug]'>) => {
  const slug = (await params).slug as LectureSlugType;
  const isAvailable = await lectureLoaders.getIsAvailable(slug);

  if (!isAvailable) {
    redirect('/lectures');
  }

  const MdxComponent = getLectureMdxComponent(slug);

  return <MdxComponent />;
};

export default Page;
