import { ProjectForm } from '@/modules/project/components/project-form';
import { getMineProjectLoader } from '@/modules/session-user/loader';

import { SubmitProjectCard } from './_components/submit-project-card';
import { ProjectCard, ProjectHero } from './_components';

const Page = async () => {
  const project = await getMineProjectLoader();

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
