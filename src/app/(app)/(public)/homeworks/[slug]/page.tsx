import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getHomeworkMdxComponent } from '@/modules/homework/mdx';
import { lectureLoaders } from '@/modules/lecture/loader';
import {
  homeworkSlugSchema,
  type HomeworkSlugType
} from '@/modules/lecture/schema';
import { tryCatch } from '@/lib/try-catch';

const truncateDescription = (text: string, maxLength = 160) =>
  text.length <= maxLength ? text : `${text.slice(0, maxLength - 3)}...`;

export const generateMetadata = async ({
  params
}: PageProps<'/homeworks/[slug]'>): Promise<Metadata> => {
  const slug = (await params).slug as HomeworkSlugType;
  const lectures = await lectureLoaders.getAllWithHomework();
  const lecture = lectures.find(l => l.homeworkSlug === slug);

  if (!lecture) {
    return { title: 'Homework' };
  }

  return {
    title: lecture.homeworkName,
    description: truncateDescription(lecture.homeworkPreview)
  };
};

export const generateStaticParams = () => {
  const slugs = homeworkSlugSchema.options;

  return slugs.filter(slug => slug !== '').map(slug => ({ slug }));
};

const Page = async ({ params }: PageProps<'/homeworks/[slug]'>) => {
  const slug = (await params).slug as HomeworkSlugType;
  const [isAvailable, error] = await tryCatch(
    lectureLoaders.getIsHomeworkAvailable(slug)
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
    redirect('/homeworks');
  }

  const MdxComponent = getHomeworkMdxComponent(slug);

  return <MdxComponent />;
};

export default Page;
