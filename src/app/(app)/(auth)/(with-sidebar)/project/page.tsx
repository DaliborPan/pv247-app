import { ProjectForm } from '@/modules/project/components/project-form/project-form';
import { getMyProjectQuery } from '@/modules/project/queries';

import { ProjectDescriptionCard } from './_components/project-description-card';
import { ProjectHero } from './_components/project-hero';
import { SubmitProjectCard } from './_components/submit-project-card';

const Page = async () => {
  const project = await getMyProjectQuery();

  return project ? (
    <div className="flex flex-col gap-y-4">
      <ProjectHero project={project} />

      {project.description && (
        <ProjectDescriptionCard description={project.description} />
      )}

      <SubmitProjectCard project={project} />
    </div>
  ) : (
    <ProjectForm />
  );
};

export default Page;
