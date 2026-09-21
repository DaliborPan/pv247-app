import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getHomeworkMdxComponent } from '@/modules/homework/mdx/get-mdx-component';
import {
  getIsHomeworkAvailableCachedQuery,
  getLecturesWithHomeworkCachedQuery
} from '@/modules/lecture/queries';
import { homeworkSlugSchema } from '@/modules/lecture/schema';

const truncateDescription = (text: string, maxLength = 160) =>
  text.length <= maxLength ? text : `${text.slice(0, maxLength - 3)}...`;

export const generateMetadata = async ({
  params
}: PageProps<'/homeworks/[slug]'>): Promise<Metadata> => {
  const parsedSlug = homeworkSlugSchema.safeParse((await params).slug);

  if (!parsedSlug.success) {
    return {};
  }

  const lectures = await getLecturesWithHomeworkCachedQuery();
  const lecture = lectures.find(l => l.homeworkSlug === parsedSlug.data);

  if (!lecture) {
    return {};
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
  const parsedSlug = homeworkSlugSchema.safeParse((await params).slug);

  if (
    !parsedSlug.success ||
    !(await getIsHomeworkAvailableCachedQuery(parsedSlug.data))
  ) {
    notFound();
  }

  const MdxComponent = getHomeworkMdxComponent(parsedSlug.data);

  return <MdxComponent />;
};

export default Page;
