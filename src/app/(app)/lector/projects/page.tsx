import { getProjects } from '@/modules/project/server';

import { ProjectCard } from './_components';

const Page = async () => {
  const projects = await getProjects();

  const awardedProjects = projects.filter(project => !!project.points);
  const otherProjects = projects.filter(project => !project.points);

  return (
    <>
      <h2 className="mb-6 text-3xl">Awarded projects</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {awardedProjects.length ? (
          awardedProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p className="col-span-2 text-gray-500">No awarded projects</p>
        )}
      </div>

      <h2 className="mb-6 mt-12 text-3xl">Projects without points</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {otherProjects.length ? (
          otherProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p className="col-span-2 text-gray-500">No projects without points</p>
        )}
      </div>
    </>
  );
};

export default Page;
