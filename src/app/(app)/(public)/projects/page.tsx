import { Suspense } from 'react';

import { Button } from '@/components/base/button/button';
import { OverviewCard } from '@/components/overview-card';
import { projectExamples } from '@/modules/project-example/conts';
import { MyProjectLink } from '@/modules/project/components/my-project-link';

export const metadata = {
  title: 'Projects',
  description: 'Example assignments for your PV247 team project'
};

const Page = () => (
  <main className="mx-auto max-w-4xl">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-3xl">Projects</h1>

      <Suspense fallback={null}>
        <MyProjectLink />
      </Suspense>
    </div>

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
          <OverviewCard key={example.slug}>
            <OverviewCard.Title as="h3" lang="cs">
              {example.title}
            </OverviewCard.Title>

            {example.description && (
              <OverviewCard.Description lang="cs">
                {example.description}
              </OverviewCard.Description>
            )}

            <OverviewCard.Footer>
              <Button
                href={`/projects/examples/${example.slug}`}
                size="sm"
                aria-label={`View assignment: ${example.title}`}
              >
                View assignment
              </Button>
            </OverviewCard.Footer>
          </OverviewCard>
        ))}
      </div>
    </section>
  </main>
);

export default Page;
