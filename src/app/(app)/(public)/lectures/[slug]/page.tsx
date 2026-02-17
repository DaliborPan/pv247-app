import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { lectureLoaders } from '@/modules/lecture/loader';
import { getLectureMdxComponent } from '@/modules/lecture/mdx';
import {
  lectureSlugSchema,
  type LectureSlugType
} from '@/modules/lecture/schema';
import { tryCatch } from '@/lib/try-catch';

const truncateDescription = (text: string, maxLength = 160) =>
  text.length <= maxLength ? text : `${text.slice(0, maxLength - 3)}...`;

export const generateMetadata = async ({
  params
}: PageProps<'/lectures/[slug]'>): Promise<Metadata> => {
  const slug = (await params).slug as LectureSlugType;
  const lectures = await lectureLoaders.getMany();
  const lecture = lectures.find(l => l.slug === slug);

  if (!lecture) {
    return { title: 'Lecture' };
  }

  return {
    title: lecture.name,
    description: truncateDescription(lecture.preview)
  };
};

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
