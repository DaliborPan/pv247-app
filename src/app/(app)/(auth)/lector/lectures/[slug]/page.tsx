import { getLectureMdxComponent } from '@/modules/lecture/mdx';
import { type LectureSlugType } from '@/modules/lecture/schema';

const Page = async (props: {
  params: Promise<{
    slug: string;
  }>;
}) => {
  const params = await props.params;
  const MdxComponent = getLectureMdxComponent(params.slug as LectureSlugType);

  return <MdxComponent />;
};

export default Page;
