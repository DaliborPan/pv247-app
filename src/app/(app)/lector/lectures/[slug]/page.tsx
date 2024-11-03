import { type LectureSlug } from '@/db';
import { getLectureMdxComponent } from '@/modules/lecture';

type Params = {
  slug: LectureSlug;
};

const Page = async ({ params }: { params: Params }) => {
  const MdxComponent = getLectureMdxComponent(params.slug);

  return <MdxComponent />;
};

export default Page;
