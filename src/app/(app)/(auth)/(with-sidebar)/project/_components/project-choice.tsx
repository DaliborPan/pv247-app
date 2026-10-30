import { Button } from '@/components/base/button/button';
import { OverviewCard } from '@/components/overview-card';
import { projectAssignments } from '@/modules/project-example/assignments';
import { CreateExampleAssignmentProjectAction } from '@/modules/project/components/create-example-assignment-project-action/create-example-assignment-project-action';
import { getProjectFormStudentComboboxOptionsQuery } from '@/modules/project/queries';
import { getSessionUser } from '@/modules/session-user/session-user';

export const ProjectChoice = async () => {
  const sessionUser = await getSessionUser();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl">Create a project</h1>

      <p className="max-w-3xl leading-7 text-text-secondary">
        Form a team of 2–4 students, including yourself. Choose one of the
        offered assignments without changes, or propose your own topic. Team
        members are added immediately and cannot be changed later. To change
        your team or topic, cancel the project and create a new one.
      </p>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {projectAssignments.map(assignment => (
          <OverviewCard key={assignment.slug}>
            <OverviewCard.Title>{assignment.title}</OverviewCard.Title>
            <OverviewCard.Description>
              {assignment.description}
            </OverviewCard.Description>
            <OverviewCard.Footer className="lg:flex-col lg:items-stretch">
              <Button
                href={`/projects/examples/${assignment.slug}`}
                variant="link"
                target="_blank"
                rel="noreferrer"
              >
                Read full assignment (new tab)
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
        <OverviewCard>
          <OverviewCard.Title>Your own project</OverviewCard.Title>
          <OverviewCard.Description>
            Have your own idea? Describe your topic and choose your team. You
            can update your project details later, but team members stay fixed.
          </OverviewCard.Description>
          <OverviewCard.Footer>
            <Button href="/project/new">Create your own project</Button>
          </OverviewCard.Footer>
        </OverviewCard>
      </div>
    </div>
  );
};
