import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { projectExamples } from '@/modules/project-example/conts';

import { BackButton } from './_components/back-button';

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
      <BackButton />

      <h1 className="mb-6 mt-8 text-3xl leading-tight sm:text-4xl" lang="cs">
        {example.title}
      </h1>

      {example.description && (
        <p className="leading-7 text-text-secondary">
          Choose this assignment without changes for a team of 2–4 students, or
          follow its structure when proposing your own topic. The assignment and
          team members stay fixed after creation; you can add a GitHub
          repository later.
        </p>
      )}

      <article lang="cs">
        <Content />
      </article>
    </main>
  );
};

export default Page;
