import Link from 'next/link';
import { Pencil } from 'lucide-react';

import { Button } from '@/components/base/button';
import { DetailCard } from '@/components/detail-card';
import { getMineProjectLoader } from '@/modules/session-user/server';
import { SubmitProjectAction } from '@/modules/project/components/submit-project-action';

export const SubmitProjectCard = async () => {
  const project = await getMineProjectLoader();

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
        <p className="text-sm text-text-terciary">
          You need to set github link first.
        </p>
      )}
    </DetailCard>
  );
};
