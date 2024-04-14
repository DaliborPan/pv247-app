import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import { db } from '@/db';
import { Hero, OverviewCard } from '@/components/person-detail';
import { LabeledValue } from '@/components/labeled-value';
import { Icon } from '@/components/base/icon';
import { cn } from '@/lib/cn';

import { HomeworksCard } from './_components/homeworks';

const Page = async ({ params }: { params: { id: string } }) => {
	const student = await db.query.users.findFirst({
		where: users => eq(users.id, params.id),
		with: {
			homeworksStudent: {
				with: {
					lecture: true
				}
			}
		}
	});

	if (!student) {
		redirect('/lector');
	}

	const displayName = student.firstName
		? `${student.firstName} ${student.lastName}`
		: student.name;

	return (
		<div className="mb-8">
			<Hero>
				<div className="rounded-full shadow size-20 bg-gradient-to-tr from-primary-100 to-primary-300" />
				<div>
					<div className="text-2xl font-medium text-slate-900">
						{displayName}
					</div>
					<div className="text-sm text-gray-500">Course student</div>
				</div>
			</Hero>

			<OverviewCard
				userId={student.id}
				otherFields={({ project }) => (
					<LabeledValue label="Project status">
						<Link
							className={cn(
								'flex items-center transition-colors duration-200 gap-x-2 hover:text-primary-500',
								!project.project?.id && 'pointer-events-none'
							)}
							href={`/lector/projects/${project.project?.id ?? ''}`}
						>
							<span className="block">{project.display}</span>
							{project.project?.id && <Icon name="ExternalLink" />}
						</Link>
					</LabeledValue>
				)}
			/>

			{/* TODO: Attendance */}

			<HomeworksCard studentHomeworks={student.homeworksStudent} />
		</div>
	);
};

export default Page;
