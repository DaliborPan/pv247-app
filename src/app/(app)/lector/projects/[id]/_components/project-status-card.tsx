import { Github, Pencil, SquareArrowOutUpRight } from 'lucide-react';

import { Button } from '@/components/base/button';
import { SidebarCard } from '@/components/sidebar-card';
import { type Project } from '@/db';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/base/icon';
import {
  SetProjectPointsAction,
  ApproveProjectButton
} from '@/modules/project';

export const ProjectStatusCard = ({ project }: { project: Project }) => {
  const status = project.status;
  const hasPoints = !!project.points;

  return (
    <SidebarCard
      customTitle={
        <div className="flex items-center mb-2 gap-x-2">
          <h3
            className={cn(
              'truncate grow',
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
            <button className="flex items-center w-full px-4 py-2 bg-white rounded-md shadow hover:bg-background">
              <span className="font-medium text-left grow text-primary">
                {project.points} points
              </span>

              <Icon icon={<Pencil />} />
            </button>
          </SetProjectPointsAction>

          <p className="text-sm leading-6 text-gray-600 mt-4 whitespace-pre-wrap">
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
