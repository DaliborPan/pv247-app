import { type Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { projectExamples } from '@/modules/project-example/examples';

export const generateStaticParams = () =>
  projectExamples.map(example => ({ slug: example.slug }));

const getProjectExampleOrNotFound = (slug: string) => {
  const example = projectExamples.find(example => example.slug === slug);

  if (!example) {
    notFound();
  }

  return example;
};

export const generateMetadata = async ({
  params
}: PageProps<'/projects/examples/[slug]'>): Promise<Metadata> => {
  const { slug } = await params;
  const example = getProjectExampleOrNotFound(slug);

  return {
    title: example.title,
    description: example.description
  };
};

const Page = async ({ params }: PageProps<'/projects/examples/[slug]'>) => {
  const { slug } = await params;
  const example = getProjectExampleOrNotFound(slug);
  const { Content } = example;

  return (
    <main className="mx-auto max-w-4xl">
      <Link
        href="/projects"
        className="text-primary underline underline-offset-4 hover:no-underline focus-visible:outline-primary"
      >
        <span aria-hidden="true">← </span>Example assignments
      </Link>

      <h1 className="mb-6 mt-8 text-3xl leading-tight sm:text-4xl" lang="cs">
        {example.title}
      </h1>

      {example.description && (
        <p className="leading-7 text-text-secondary">
          You can use this assignment for your team project, adapt it, or follow
          its structure when proposing your own topic.
        </p>
      )}

      <article lang="cs">
        <Content />
      </article>
    </main>
  );
};

export default Page;
