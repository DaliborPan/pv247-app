import { getLectureMdxComponent } from '@/modules/lecture/mdx';
import { type LectureSlugType } from '@/modules/lecture/schema';

type Params = {
  slug: LectureSlugType;
};

const Page = async ({ params }: { params: Params }) => {
  const MdxComponent = getLectureMdxComponent(params.slug);

  return <MdxComponent />;
};

export default Page;
