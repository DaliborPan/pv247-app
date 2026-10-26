import Link from 'next/link';

import { projectExamples } from '@/modules/project-example/examples';

export const metadata = {
  title: 'Projects',
  description: 'Example assignments for your PV247 team project'
};

const Page = () => (
  <main className="mx-auto max-w-4xl">
    <h1 className="mb-6 text-3xl">Projects</h1>

    <p className="mb-8 max-w-3xl leading-7 text-text-secondary">
      Use one of these example assignments, adapt it to your team, or propose
      your own project following a similar structure. Your team project still
      needs to be approved by a lector.
    </p>

    <section aria-labelledby="example-assignments">
      <h2 id="example-assignments" className="mb-4 text-xl font-medium">
        Example assignments
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projectExamples.map(example => (
          <article
            key={example.slug}
            className="flex flex-col rounded-lg bg-white p-6 shadow"
          >
            <h3 className="text-xl font-medium" lang="cs">
              {example.title}
            </h3>

            {example.description && (
              <p className="mt-3 leading-7 text-text-secondary" lang="cs">
                {example.description}
              </p>
            )}

            <Link
              href={`/projects/examples/${example.slug}`}
              className="mt-auto self-start pt-6 text-primary underline underline-offset-4 hover:no-underline focus-visible:outline-primary"
              aria-label={`View assignment: ${example.title}`}
            >
              View assignment <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  </main>
);

export default Page;
