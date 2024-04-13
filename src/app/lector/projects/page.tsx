import Link from 'next/link';

import { auth } from '@/auth';
import { Badge } from '@/components/base/badge';
import { Button } from '@/components/base/button';
import { Icon } from '@/components/base/icon';
import { TextPreview } from '@/components/text-preview';
import { db } from '@/db';
import { formatDate } from '@/lib/date';

const getProjects = async () =>
	await db.query.projects.findMany({
		with: {
			users: true
		}
	});

type ProjectCardProps = {
	project: Awaited<ReturnType<typeof getProjects>>[number];
};

const ProjectCard = ({ project }: ProjectCardProps) => (
	<article className="p-6 bg-white rounded-lg shadow">
		<span className="flex items-center mb-1 text-xs text-gray-500 truncate">
			<Icon name="Users" className="mr-2" />
			{project.users
				.map(user => `${user.firstName} ${user.lastName}`)
				.join(', ')}
		</span>

		<h2 className="text-xl font-medium">{project.name}</h2>

		<TextPreview className="mt-3 line-clamp-4">
			{project.description}
		</TextPreview>

		<div className="flex items-end justify-between mt-6 gap-x-2">
			<Link href={`/lector/projects/${project.id}`} className="grow">
				<Button size="sm">Open project</Button>
			</Link>

			<Badge variant="outline" className="text-gray-600">
				<Icon name="Calendar" className="mr-2" />
				{formatDate(project.updatedAt)}
			</Badge>

			{project.status === 'submitted' && project.points ? (
				<Badge className="flex items-center gap-x-1.5">
					<Icon name="Check" />
					{project.points} points
				</Badge>
			) : (
				<Badge variant="outline" className="text-gray-600">
					{project.status}
				</Badge>
			)}
		</div>
	</article>
);

const Page = async () => {
	const session = await auth();
	if (!session?.user) {
		return null;
	}

	const projects = await getProjects();

	const awardedProjects = projects.filter(project => !!project.points);
	const otherProjects = projects.filter(project => !project.points);

	return (
		<>
			<h2 className="mb-6 text-3xl">Awarded projects</h2>

			<div className="grid grid-cols-2 gap-6">
				{awardedProjects.length ? (
					awardedProjects.map(project => (
						<ProjectCard key={project.id} project={project} />
					))
				) : (
					<p className="col-span-2 text-gray-500">No awarded projects</p>
				)}
			</div>

			<h2 className="mt-12 mb-6 text-3xl">Projects without points</h2>

			<div className="grid grid-cols-2 gap-6">
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
