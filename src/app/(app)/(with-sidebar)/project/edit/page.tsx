import { redirect } from 'next/navigation';

import { getMineProject, getSessionUser } from '@/modules/session-user';
import { ProjectForm } from '@/modules/project';

const Page = async () => {
  const sessionUser = await getSessionUser();
  const project = await getMineProject();

  if (!project) return redirect('/project');

  const defaultValues = {
    id: project.id,
    name: project.name,
    description: project.description ?? '',
    github: project.github ?? '',
    students: project.users
      .filter(user => user.id !== sessionUser.id)
      .map(user => user.id)
  };

  return <ProjectForm defaultValues={defaultValues} />;
};

export default Page;
