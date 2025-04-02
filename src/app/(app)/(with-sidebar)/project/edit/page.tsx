import { redirect } from 'next/navigation';

import { getSessionUser } from '@/modules/session-user';
import { ProjectForm } from '@/modules/project/components/project-form';
import { getMineProjectLoader } from '@/modules/session-user/loader';

const Page = async () => {
  const sessionUser = await getSessionUser();
  const project = await getMineProjectLoader();

  if (!project) return redirect('/project');

  const defaultValues = {
    id: project.id,
    name: project.name,
    shortDescription: project.shortDescription ?? '',
    description: project.description ?? '',
    github: project.github ?? '',
    students: project.users
      .filter(user => user.id !== sessionUser.id)
      .map(user => user.id)
  };

  return <ProjectForm defaultValues={defaultValues} />;
};

export default Page;
