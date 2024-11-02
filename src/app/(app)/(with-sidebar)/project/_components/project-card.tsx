import { DetailCard } from '@/components/detail-card';
import { getMineProject } from '@/modules/session-user/server';

export const ProjectCard = async () => {
	const project = await getMineProject();

	return (
		<DetailCard title="Description">
			<p className="font-light leading-8 text-gray-500">
				{project?.description}
			</p>
		</DetailCard>
	);
};
