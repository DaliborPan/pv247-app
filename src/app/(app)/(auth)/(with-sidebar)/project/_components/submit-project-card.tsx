import Link from 'next/link';
import { Pencil } from 'lucide-react';

import { Button } from '@/components/base/button';
import { DetailCard } from '@/components/detail-card';

import { projectLoaders } from '@/modules/project/loader';
import { LoaderResult } from '@/types';

export const SubmitProjectCard = ({
  project
}: {
  project: NonNullable<LoaderResult<typeof projectLoaders.getMine>>;
}) => {
  const isCreated = project.status === 'CREATED';

  const statusLabel =
    project.status === 'CREATED'
      ? 'Your project is created!'
      : project.status === 'APPROVED'
        ? 'Your project is approved!'
        : project.status === 'COMPLETED'
          ? 'Your project is completed!'
          : project.status === 'FAILED'
            ? 'Your project is failed!'
            : 'Unknown';

  return (
    <DetailCard
      title={statusLabel}
      actions={
        !project.github &&
        isCreated && (
          <Link href="/project/edit">
            <Button
              size="sm"
              variant="outline/primary"
              iconLeft={{ icon: <Pencil /> }}
            >
              Set github link
            </Button>
          </Link>
        )
      }
    >
      {project.comment}
    </DetailCard>
  );
};
