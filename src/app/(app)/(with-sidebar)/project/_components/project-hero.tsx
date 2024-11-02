import Link from 'next/link';
import { Github, Pencil, Users } from 'lucide-react';

import { Button } from '@/components/base/button';
import { Hero } from '@/components/person-detail';
import { getSessionUserProject } from '@/db/session-user-service/project';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/base/icon';

const GithubLink = ({ href }: { href?: string | null }) => (
	<a
		href={href ?? ''}
		target="_blank"
		rel="noreferrer"
		className={cn(!href && 'pointer-events-none')}
	>
		<Button
			size="sm"
			variant="outline"
			iconLeft={{ icon: <Github /> }}
			disabled={!href}
		/>
	</a>
);

const EditLink = ({ disabled }: { disabled: boolean }) => (
	<Link href="/project/edit" className={cn(disabled && 'pointer-events-none')}>
		<Button
			disabled={disabled}
			size="sm"
			variant="outline"
			iconLeft={{ icon: <Pencil /> }}
		/>
	</Link>
);

export const ProjectHero = async () => {
	const project = await getSessionUserProject();

	if (!project) return null;

	const displayUsers = project.users
		.map(user => `${user.firstName} ${user.lastName}`)
		.join(', ');

	return (
		<Hero
			actions={
				<>
					<GithubLink href={project.github} />
					<EditLink disabled={project.status === 'submitted'} />
				</>
			}
		>
			<div className="rounded-full shadow size-20 bg-gradient-to-tr from-primary-500 to-primary-100" />

			<div>
				<div className="text-2xl font-medium text-slate-900">
					{project.name}
				</div>
				<div className="flex items-center mt-1 gap-x-2">
					<Icon icon={<Users />} />
					<div className="text-sm text-gray-500">{displayUsers}</div>
				</div>
			</div>
		</Hero>
	);
};
