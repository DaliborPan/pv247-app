import { DetailCard } from '@/components/detail-card';
import { getMineProject } from '@/modules/session-user/server';

import { ProjectForm } from './_components/project-form';
import { ProjectHero } from './_components/project-hero';
import { SubmitProjectCard } from './_components/submit-project-card';

const ProjectCard = async () => {
	const project = await getMineProject();

	return (
		<DetailCard title="Description">
			<p className="font-light leading-8 text-gray-500">
				{project?.description}
			</p>
		</DetailCard>
	);
};

const Page = async () => {
	const project = await getMineProject();

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
