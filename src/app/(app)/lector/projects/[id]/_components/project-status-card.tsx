import { Github, Pencil, SquareArrowOutUpRight } from 'lucide-react';

import { Button } from '@/components/base/button';
import { SidebarCard } from '@/components/sidebar-card';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/base/icon';
import { SetProjectPointsAction } from '@/modules/project/components/set-project-points-action';
import { ApproveProjectButton } from '@/modules/project/components/approve-project-action';
import { type GetProjectsLoaderResult } from '@/modules/project/server';

export const ProjectStatusCard = ({
  project
}: {
  project: GetProjectsLoaderResult[number];
}) => {
  const status = project.status;
  const hasPoints = !!project.points;

  return (
    <SidebarCard
      customTitle={
        <div className="mb-2 flex items-center gap-x-2">
          <h3
            className={cn(
              'grow truncate',
              project.status === 'pending' ? 'text-sm' : 'text-lg'
            )}
          >
            {status === 'approved'
              ? 'Approved!'
              : status === 'pending'
                ? 'This project has not been approved yet.'
                : 'Project submitted!'}
          </h3>

          {status === 'submitted' && (
            <a href={project.github ?? ''} target="_blank" rel="noreferrer">
              <Button
                size="sm"
                variant="outline/primary"
                iconLeft={{ icon: <Github /> }}
                disabled={!project.github}
              />
            </a>
          )}
        </div>
      }
    >
      {hasPoints && (
        <div className="mt-4">
          <SetProjectPointsAction
            projectId={project.id}
            defaultValues={{
              points: project.points ?? undefined,
              comment: project.comment ?? undefined
            }}
          >
            <button className="flex w-full items-center rounded-md bg-white px-4 py-2 shadow hover:bg-background">
              <span className="grow text-left font-medium text-primary">
                {project.points} points
              </span>

              <Icon icon={<Pencil />} />
            </button>
          </SetProjectPointsAction>

          <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-text-secondary">
            {project.comment}
          </p>
        </div>
      )}

      {status === 'submitted' && !hasPoints && (
        <SetProjectPointsAction projectId={project.id}>
          <Button size="sm" iconLeft={{ icon: <SquareArrowOutUpRight /> }}>
            Set points
          </Button>
        </SetProjectPointsAction>
      )}

      {status !== 'submitted' && <ApproveProjectButton project={project} />}
    </SidebarCard>
  );
};
