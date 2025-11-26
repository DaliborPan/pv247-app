import { redirect } from 'next/navigation';

import { RichTextEditor } from '@/components/base/rich-text-editor';

import { ProjectStatusCard, ProjectUsersCard } from './_components';
import { projectLoaders } from '@/modules/project/loader';

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const project = await projectLoaders.get(params.id);

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
