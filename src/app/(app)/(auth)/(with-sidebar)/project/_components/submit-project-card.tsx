import Link from 'next/link';
import { Pencil } from 'lucide-react';

import { Button } from '@/components/base/button';
import { DetailCard } from '@/components/detail-card';

import { projectLoaders } from '@/modules/project/loader';
import { LoaderResult } from '@/types';
import { getProjectStatusLabel } from '@/modules/project/utils/project-status';

export const SubmitProjectCard = ({
  project
}: {
  project: NonNullable<LoaderResult<typeof projectLoaders.getMine>>;
}) => {
  return (
    <DetailCard
      title={`Your project is ${getProjectStatusLabel(project)}`}
      actions={
        !project.github &&
        project.status === 'CREATED' && (
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
