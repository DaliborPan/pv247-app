import { Pencil } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/base/button/button';
import { DetailCard } from '@/components/detail-card';
import { type ProjectType } from '@/modules/project/types';
import { getProjectStatusLabel } from '@/modules/project/utils/project-status';

export const SubmitProjectCard = ({ project }: { project: ProjectType }) => (
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
