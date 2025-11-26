import { Suspense } from 'react';
import { ProjectCard } from './_components/project-card';
import { projectLoaders } from '@/modules/project/loader';

const Page = async () => {
  const projectsWithPoints = await projectLoaders.getWithPoints();
  const projectsWithoutPoints = await projectLoaders.getWithoutPoints();

  return (
    <>
      <h2 className="mb-6 text-3xl">Awarded projects</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Suspense>
          {projectsWithPoints.length ? (
            projectsWithPoints.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <p className="col-span-2 text-text-terciary">No awarded projects</p>
          )}
        </Suspense>
      </div>

      <h2 className="mb-6 mt-12 text-3xl">Projects without points</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projectsWithoutPoints.length ? (
          projectsWithoutPoints.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p className="col-span-2 text-text-terciary">
            No projects without points
          </p>
        )}
      </div>
    </>
  );
};

export default Page;
