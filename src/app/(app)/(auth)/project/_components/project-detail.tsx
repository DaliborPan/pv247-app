import { OverviewCard } from '@/components/overview-card';
import { CancelProjectAction } from '@/modules/project/components/cancel-project-action/cancel-project-action';
import { ProjectTeamMembers } from '@/modules/project/components/project-form/project-team-members';
import { type ProjectType } from '@/modules/project/types';

import { ProjectDescriptionCard } from './project-description-card';
import { ProjectHero } from './project-hero';

export const ProjectDetail = ({ project }: { project: ProjectType }) => (
  <div className="flex flex-col gap-6">
    <h1 className="text-2xl sm:text-3xl">My project</h1>
    <ProjectHero project={project} />

    {!project.assignment && project.description && (
      <ProjectDescriptionCard description={project.description} />
    )}

    <OverviewCard className="gap-5">
      <header className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <OverviewCard.Title>Team membership</OverviewCard.Title>
          <p className="text-sm text-text-secondary">
            {project.users.length} members
          </p>
        </div>
        <p className="text-sm text-text-secondary">
          Team members cannot be changed.
        </p>
      </header>

      <div className="rounded-lg bg-background p-4 sm:p-5">
        <ProjectTeamMembers
          members={project.users.map(user => ({
            id: user.id,
            name:
              [user.firstName, user.lastName].filter(Boolean).join(' ') ||
              user.name
          }))}
        />
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="min-w-0 max-w-2xl flex-1 text-sm leading-6 text-text-secondary">
          Any member can permanently cancel this project to dissolve the team
          and free all members.
        </p>
        <div className="shrink-0">
          <CancelProjectAction name={project.name} />
        </div>
      </div>
    </OverviewCard>
  </div>
);
