import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getLectureMdxComponent } from '@/modules/lecture/mdx/get-mdx-component';
import {
  getIsLectureAvailableCachedQuery,
  getLecturesCachedQuery
} from '@/modules/lecture/queries';
import { lectureSlugSchema } from '@/modules/lecture/schema';

const truncateDescription = (text: string, maxLength = 160) =>
  text.length <= maxLength ? text : `${text.slice(0, maxLength - 3)}...`;

export const generateMetadata = async ({
  params
}: PageProps<'/lectures/[slug]'>): Promise<Metadata> => {
  const parsedParams = lectureSlugSchema.safeParse((await params).slug);

  if (!parsedParams.success) {
    return {};
  }

  const lectures = await getLecturesCachedQuery();
  const lecture = lectures.find(l => l.slug === parsedParams.data);

  if (!lecture) {
    return {};
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
  const parsedParams = lectureSlugSchema.safeParse((await params).slug);

  if (
    !parsedParams.success ||
    !(await getIsLectureAvailableCachedQuery(parsedParams.data))
  ) {
    notFound();
  }

  const MdxComponent = getLectureMdxComponent(parsedParams.data);

  return <MdxComponent />;
};

export default Page;
