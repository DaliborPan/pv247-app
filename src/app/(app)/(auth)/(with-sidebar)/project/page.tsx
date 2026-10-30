import { Suspense } from 'react';

import { DetailCard } from '@/components/detail-card';
import { projectExamples } from '@/modules/project-example/conts';
import { CancelProjectAction } from '@/modules/project/components/cancel-project-action/cancel-project-action';
import { getMyProjectQuery } from '@/modules/project/queries';

import { ProjectChoice } from './_components/project-choice';
import { ProjectDescriptionCard } from './_components/project-description-card';
import { ProjectHero } from './_components/project-hero';

const ProjectPage = async () => {
  const project = await getMyProjectQuery();

  const assignment = project?.assignment
    ? projectExamples.find(example => example.slug === project.assignment)
    : undefined;

  return project ? (
    <div className="flex flex-col gap-y-4">
      <ProjectHero project={project} />

      {!assignment && project.description && (
        <ProjectDescriptionCard description={project.description} />
      )}

      <DetailCard
        title="Team membership"
        actions={<CancelProjectAction name={project.name} />}
      >
        <p className="text-sm text-text-secondary">
          Team members cannot be changed. Any member can permanently cancel this
          project to dissolve the team and free all members.
        </p>
      </DetailCard>
    </div>
  ) : (
    <ProjectChoice />
  );
};

export default function Page() {
  return (
    <Suspense fallback={<p role="status">Loading project…</p>}>
      <ProjectPage />
    </Suspense>
  );
}
