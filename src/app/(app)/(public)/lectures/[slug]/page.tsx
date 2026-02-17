import { redirect } from 'next/navigation';

import { lectureLoaders } from '@/modules/lecture/loader';
import { getLectureMdxComponent } from '@/modules/lecture/mdx';
import {
  lectureSlugSchema,
  type LectureSlugType
} from '@/modules/lecture/schema';
import { tryCatch } from '@/lib/try-catch';

export const generateStaticParams = () => {
  const lectures = lectureSlugSchema.options;

  return lectures.map(slug => ({ slug }));
};

const Page = async ({ params }: PageProps<'/lectures/[slug]'>) => {
  const slug = (await params).slug as LectureSlugType;
  const [isAvailable, error] = await tryCatch(
    lectureLoaders.getIsAvailable(slug)
  );

  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-light">Something went wrong...</h1>
        <p className="text-sm text-text-terciary">{error.message}</p>
      </div>
    );
  }

  if (!isAvailable) {
    redirect('/lectures');
  }

  const MdxComponent = getLectureMdxComponent(slug);

  return <MdxComponent />;
};

export default Page;
