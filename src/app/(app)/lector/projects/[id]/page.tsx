import { redirect } from 'next/navigation';

import { getProject } from '@/modules/project';

import { ProjectStatusCard, ProjectUsersCard } from './_components';

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const project = await getProject(id);

  if (!project) {
    redirect('/lector/projects');
  }

  return (
    <div className="flex flex-col-reverse gap-y-8 md:gap-y-0 md:flex-row">
      <div className="md:w-2/3 w-full">
        <h1 className="mb-6 text-3xl">{project.name}</h1>
        <p>{project.description}</p>
      </div>

      <aside className="flex flex-col md:w-1/3 w-full gap-y-6">
        <ProjectStatusCard project={project} />
        <ProjectUsersCard project={project} />
      </aside>
    </div>
  );
};

export default Page;
