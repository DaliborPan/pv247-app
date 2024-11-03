import Link from 'next/link';
import { Pencil } from 'lucide-react';

import { Button } from '@/components/base/button';
import { DetailCard } from '@/components/detail-card';
import { getMineProject } from '@/modules/session-user';
import { SubmitProjectAction } from '@/modules/project';

export const SubmitProjectCard = async () => {
  const project = await getMineProject();

  if (!project) return null;

  const isPending = project.status === 'pending';

  return (
    <DetailCard
      title={
        isPending
          ? 'Your project is waiting to be approved.'
          : project.points
            ? `Your project is worth ${project.points} points. 🎉`
            : 'Ready to submit your project?'
      }
      actions={
        !project.github &&
        !isPending && (
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
      {isPending ? null : project.github ? (
        <SubmitProjectAction project={project} />
      ) : (
        <p className="text-sm text-gray-600">
          You need to set github link first.
        </p>
      )}
    </DetailCard>
  );
};
