import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/base/button';
import { LabeledValue } from '@/components/labeled-value';
import { DetailCard } from '@/components/detail-card';
import { getMineProject } from '@/modules/session-user/server';

export const ProfileProjectCard = async () => {
	const project = await getMineProject();

	if (!project) return null;

	return (
		<DetailCard
			title="Project"
			actions={
				<Link href="/project">
					<Button
						variant="primary/inverse"
						size="sm"
						iconLeft={{ icon: <ArrowRight /> }}
					/>
				</Link>
			}
		>
			<div className="flex flex-col gap-y-3">
				<LabeledValue label="Project name">{project.name}</LabeledValue>
				<LabeledValue label="Project description">
					<p className="relative pl-4 mt-2 text-sm font-light leading-6 line-clamp-3">
						<span className="absolute left-0 w-1 h-full bg-primary" />
						{project.description}
					</p>
				</LabeledValue>
			</div>
		</DetailCard>
	);
};
