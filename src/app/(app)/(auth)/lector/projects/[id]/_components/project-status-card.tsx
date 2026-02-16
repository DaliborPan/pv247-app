import { Github, Pencil, SquareArrowOutUpRight } from 'lucide-react';

import { Button } from '@/components/base/button';
import { SidebarCard } from '@/components/sidebar-card';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/base/icon';
import { SetProjectPointsAction } from '@/modules/project/components/set-project-points-action';
import { ApproveProjectButton } from '@/modules/project/components/approve-project-action';
import { ProjectType } from '@/modules/project/schema';

export const ProjectStatusCard = ({ project }: { project: ProjectType }) => {
  const status = project.status;

  const isScored = status === 'COMPLETED' || status === 'FAILED';

  return (
    <SidebarCard
      customTitle={
        <div className="mb-2 flex items-center gap-x-2">
          <h3
            className={cn(
              'grow truncate',
              project.status === 'CREATED' ? 'text-sm' : 'text-lg'
            )}
          >
            {status === 'APPROVED'
              ? 'Approved!'
              : status === 'CREATED'
                ? 'This project has not been approved yet.'
                : status === 'COMPLETED'
                  ? 'Project completed!'
                  : status === 'FAILED'
                    ? 'Project failed!'
                    : 'Unknown status'}
          </h3>

          {status === 'APPROVED' && (
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
      {isScored && (
        <div className="mt-4">
          <SetProjectPointsAction
            projectId={project.id}
            defaultValues={{
              status: project.status as never,
              comment: project.comment ?? undefined
            }}
          >
            <button className="flex w-full items-center rounded-md bg-white px-4 py-2 shadow hover:bg-background">
              <span className="grow text-left font-medium text-primary">
                {project.status === 'COMPLETED' ? 'Completed' : 'Failed'}
              </span>

              <Icon icon={<Pencil />} />
            </button>
          </SetProjectPointsAction>

          <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-text-secondary">
            {project.comment}
          </p>
        </div>
      )}

      {status === 'APPROVED' && (
        <SetProjectPointsAction projectId={project.id}>
          <Button size="sm" iconLeft={{ icon: <SquareArrowOutUpRight /> }}>
            Set points
          </Button>
        </SetProjectPointsAction>
      )}

      {(status === 'CREATED' || status === 'APPROVED') && (
        <ApproveProjectButton project={project} />
      )}
    </SidebarCard>
  );
};
