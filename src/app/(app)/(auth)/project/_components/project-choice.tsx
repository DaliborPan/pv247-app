import { Button } from '@/components/base/button/button';
import { OverviewCard } from '@/components/overview-card';
import { projectAssignments } from '@/modules/project-example/assignments';
import { CreateExampleAssignmentProjectAction } from '@/modules/project/components/create-example-assignment-project-action/create-example-assignment-project-action';
import { ProjectForm } from '@/modules/project/components/project-form/project-form';
import { getProjectFormStudentComboboxOptionsQuery } from '@/modules/project/queries';
import { getSessionUser } from '@/modules/session-user/session-user';

export const ProjectChoice = async () => {
  const sessionUser = await getSessionUser();

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1 className="text-2xl sm:text-3xl">Create a project</h1>
        <div className="flex max-w-3xl flex-col gap-2 text-sm leading-6 text-text-secondary">
          <p>
            Form a team of 2–4 students, including yourself. Choose one of the
            offered assignments without changes, or propose your own topic.
          </p>
          <p>
            Team members are added immediately and cannot be changed later. To
            change your team or topic, cancel the project and create a new one.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projectAssignments.map(assignment => (
          <OverviewCard key={assignment.slug}>
            <OverviewCard.Title>{assignment.title}</OverviewCard.Title>
            <OverviewCard.Description>
              {assignment.description}
            </OverviewCard.Description>
            <OverviewCard.Footer className="gap-2 lg:flex-col lg:items-stretch">
              <Button
                href={`/projects/examples/${assignment.slug}`}
                variant="link"
              >
                Read full assignment
              </Button>

              <CreateExampleAssignmentProjectAction
                assignment={assignment.slug}
                title={assignment.title}
                userOptionsPromise={getProjectFormStudentComboboxOptionsQuery()}
                sessionUser={sessionUser}
              />
            </OverviewCard.Footer>
          </OverviewCard>
        ))}
      </div>

      <section>
        <OverviewCard className="p-5 sm:p-8">
          <header className="mb-8 flex max-w-2xl flex-col gap-2">
            <OverviewCard.Title id="own-project-heading">
              Or propose your own project
            </OverviewCard.Title>
            <p className="text-sm leading-6 text-text-secondary">
              Have a different idea? Describe your topic and choose your team.
              You can refine the project details later.
            </p>
          </header>

          <ProjectForm />
        </OverviewCard>
      </section>
    </div>
  );
};
