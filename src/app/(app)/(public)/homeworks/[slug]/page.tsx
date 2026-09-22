import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  getIsHomeworkAvailableCachedQuery,
  getLecturesWithHomeworkCachedQuery
} from '@/modules/lecture/queries';
import { homeworkSlugSchema } from '@/modules/lecture/schema';
import { HomeworkGeneralInfo } from '@/modules/student-homework/components/homework-general-info/homework-general-info';

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

  return (
    <>
      <HomeworkGeneralInfo slug={parsedSlug.data} />

      <h2 className="mb-6 mt-12 text-3xl">Submission</h2>
      <ol className="mb-6 list-decimal pl-6">
        <li className="my-2 font-light leading-8 text-markdown">
          Create a{' '}
          <code className="rounded-lg bg-primary-100 px-2 py-1 text-sm">
            solution
          </code>{' '}
          branch from{' '}
          <code className="rounded-lg bg-primary-100 px-2 py-1 text-sm">
            main
          </code>
          .
        </li>
        <li className="my-2 font-light leading-8 text-markdown">
          Push your solution to the{' '}
          <code className="rounded-lg bg-primary-100 px-2 py-1 text-sm">
            solution
          </code>{' '}
          branch.
        </li>
        <li className="my-2 font-light leading-8 text-markdown">
          Create a merge request from{' '}
          <code className="rounded-lg bg-primary-100 px-2 py-1 text-sm">
            solution
          </code>{' '}
          to{' '}
          <code className="rounded-lg bg-primary-100 px-2 py-1 text-sm">
            main
          </code>{' '}
          before the deadline.
        </li>
        <li className="my-2 font-light leading-8 text-markdown">
          Leave the merge request open and do not assign anyone to it.
        </li>
      </ol>
    </>
  );
};

export default Page;
