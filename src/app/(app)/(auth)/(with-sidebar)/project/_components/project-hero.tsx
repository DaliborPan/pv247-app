import { Github, Pencil, Users } from 'lucide-react';

import { Button } from '@/components/base/button/button';
import { Hero } from '@/components/base/hero';
import { Icon } from '@/components/base/icon/icon';
import { UpdateProjectRepositoryAction } from '@/modules/project/components/update-project-repository-action/update-project-repository-action';
import { type ProjectType } from '@/modules/project/types';

export const ProjectHero = ({ project }: { project: ProjectType }) => {
  const displayUsers = project.users
    .map(
      user =>
        [user.firstName, user.lastName].filter(Boolean).join(' ') || user.name
    )
    .join(', ');

  return (
    <Hero
      actions={
        <>
          {project.github && (
            <Button
              href={project.github}
              target="_blank"
              rel="noreferrer"
              size="sm"
              variant="outline"
              aria-label="Open GitHub repository"
              iconLeft={{ icon: <Github data-icon="inline-start" /> }}
            />
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
        </>
      }
    >
      <div className="min-w-0 pt-10">
        <h1 className="text-2xl font-medium">{project.name}</h1>

        <p className="mt-1 text-sm text-text-secondary">
          {project.assignment ? 'Offered assignment' : 'Your own topic'}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <Icon icon={<Users />} />
          <p className="text-sm text-text-terciary">{displayUsers}</p>
        </div>

        {project.shortDescription && (
          <p className="mt-3 text-text-secondary">{project.shortDescription}</p>
        )}
      </div>
    </Hero>
  );
};
