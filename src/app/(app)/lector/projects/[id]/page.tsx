import { redirect } from 'next/navigation';

import { getProjectsLoader } from '@/modules/project/loader';
import { RichTextEditor } from '@/components/base/rich-text-editor';

import { ProjectStatusCard, ProjectUsersCard } from './_components';

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const projects = await getProjectsLoader();
  const project = projects.find(project => project.id === id);

  if (!project) {
    redirect('/lector/projects');
  }

  return (
    <div className="flex flex-col-reverse gap-8 md:flex-row md:gap-y-0">
      <div className="w-full md:w-2/3">
        <h1 className="mb-6 text-3xl">{project.name}</h1>

        <RichTextEditor
          className="max-h-full"
          value={project.description ?? ''}
          disabled
        />
      </div>

      <aside className="flex w-full flex-col gap-y-6 md:w-1/3">
        <ProjectStatusCard project={project} />
        <ProjectUsersCard project={project} />
      </aside>
    </div>
  );
};

export default Page;
