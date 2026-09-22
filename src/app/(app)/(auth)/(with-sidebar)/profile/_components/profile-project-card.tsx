import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

import { Button } from '@/components/base/button/button';
import { DetailCard } from '@/components/detail-card';
import { LabeledValue } from '@/components/labeled-value';
import { getMyProjectQuery } from '@/modules/project/queries';

export const ProfileProjectCard = () => (
  <Suspense>
    {getMyProjectQuery().then(project => {
      if (!project) return null;

      return (
        <DetailCard
          title="Project"
          actions={
            <Link href="/project">
              <Button
                variant="primary/inverse"
                size="sm"
                iconLeft={{ icon: <ArrowRight /> }}
              />
            </Link>
          }
        >
          <div className="flex flex-col gap-y-3">
            <LabeledValue label="Project name">{project.name}</LabeledValue>
            <LabeledValue label="Project description">
              <p className="relative mt-2 line-clamp-3 pl-4 text-sm font-light leading-6">
                <span className="absolute left-0 h-full w-1 bg-primary" />

                {project.shortDescription}
              </p>
            </LabeledValue>
          </div>
        </DetailCard>
      );
    })}
  </Suspense>
);
