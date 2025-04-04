import { ProjectForm } from '@/modules/project/components/project-form';
import { getMineProjectLoader } from '@/modules/project/loader';

import { SubmitProjectCard } from './_components/submit-project-card';
import { ProjectDescriptionCard, ProjectHero } from './_components';

const Page = async () => {
  const project = await getMineProjectLoader();

  return project ? (
    <div>
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
