import { ProjectForm } from '@/modules/project/components/project-form';
import { getMineProjectLoader } from '@/modules/project/loader';

import { SubmitProjectCard } from './_components/submit-project-card';
import { ProjectCard, ProjectHero } from './_components';

const Page = async () => {
  const project = await getMineProjectLoader();

  return project ? (
    <div>
      <ProjectHero project={project} />
      <ProjectCard project={project} />
      <SubmitProjectCard project={project} />
    </div>
  ) : (
    <ProjectForm />
  );
};

export default Page;
