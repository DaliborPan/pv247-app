import { Github, Pencil } from 'lucide-react';

import { Button } from '@/components/base/button/button';
import { OverviewCard } from '@/components/overview-card';
import { UpdateProjectRepositoryAction } from '@/modules/project/components/update-project-repository-action/update-project-repository-action';
import { type ProjectType } from '@/modules/project/types';

export const ProjectHero = ({ project }: { project: ProjectType }) => (
  <OverviewCard>
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
      <div className="min-w-0 flex-1">
        <OverviewCard.Title className="break-words">
          {project.name}
        </OverviewCard.Title>
        <p className="mt-2 text-sm text-text-secondary">
          {project.assignment ? 'Offered assignment' : 'Your own topic'}
        </p>
        {project.shortDescription && (
          <p className="mt-3 max-w-3xl break-words text-sm leading-6 text-text-secondary">
            {project.shortDescription}
          </p>
        )}
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        {project.github && (
          <Button
            href={project.github}
            target="_blank"
            rel="noreferrer"
            size="sm"
            variant="outline"
            aria-label="Open GitHub repository"
            iconLeft={{ icon: <Github data-icon="inline-start" /> }}
          >
            GitHub repository
          </Button>
        )}

        {project.assignment ? (
          <UpdateProjectRepositoryAction project={project} />
        ) : (
          <Button
            href="/project/edit"
            size="sm"
            variant="outline"
            iconLeft={{ icon: <Pencil data-icon="inline-start" /> }}
          >
            Edit project
          </Button>
        )}
      </div>
    </div>
  </OverviewCard>
);
