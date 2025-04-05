import { redirect } from 'next/navigation';

import { getIsLectureAvailableLoader } from '@/modules/lecture/loader';
import { getLectureMdxComponent } from '@/modules/lecture/mdx';
import {
  lectureSlugSchema,
  type LectureSlugType
} from '@/modules/lecture/schema';

type Params = {
  slug: LectureSlugType;
};

export const generateStaticParams = (): Params[] => {
  const lectures = lectureSlugSchema.options;

  return lectures.map(slug => ({ slug }));
};

const Page = async ({ params }: { params: Params }) => {
  const isAvailable = await getIsLectureAvailableLoader(params.slug);

  if (!isAvailable) {
    redirect('/lectures');
  }

  const MdxComponent = getLectureMdxComponent(params.slug);

  return <MdxComponent />;
};

export default Page;
