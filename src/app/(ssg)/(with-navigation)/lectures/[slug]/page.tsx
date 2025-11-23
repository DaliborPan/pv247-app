import { redirect } from 'next/navigation';

import { getIsLectureAvailableLoader } from '@/modules/lecture/loader';
import { getLectureMdxComponent } from '@/modules/lecture/mdx';
import {
  lectureSlugSchema,
  type LectureSlugType
} from '@/modules/lecture/schema';

type Params = {
  slug: string;
};

export const generateStaticParams = (): Params[] => {
  const lectures = lectureSlugSchema.options;

  return lectures.map(slug => ({ slug }));
};

const Page = async (props: { params: Promise<Params> }) => {
  const params = await props.params;
  const isAvailable = await getIsLectureAvailableLoader(params.slug);

  if (!isAvailable) {
    redirect('/lectures');
  }

  const MdxComponent = getLectureMdxComponent(params.slug as LectureSlugType);

  return <MdxComponent />;
};

export default Page;
