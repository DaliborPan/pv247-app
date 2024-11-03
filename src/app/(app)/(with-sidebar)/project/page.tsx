import { getMineProject } from '@/modules/session-user';
import { ProjectForm } from '@/modules/project/components/project-form';

import { SubmitProjectCard } from './_components/submit-project-card';
import { ProjectCard, ProjectHero } from './_components';

const Page = async () => {
  const project = await getMineProject();

  return project ? (
    <div>
      <ProjectHero />
      <ProjectCard />
      <SubmitProjectCard />
    </div>
  ) : (
    <ProjectForm />
  );
};

export default Page;
