import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import { db } from '@/db';
import { Hero, OverviewCard } from '@/components/person-detail';
import { LabeledValue } from '@/components/labeled-value';
import { Icon } from '@/components/base/icon';

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
				otherFields={overview => (
					<LabeledValue label="Project status">
						<Link
							className="flex items-center transition-colors duration-200 gap-x-2 hover:text-primary-500"
							href={`/lector/projects/${overview.project.project?.id ?? ''}`}
						>
							<span className="block">{overview.project.display}</span>
							<Icon name="ExternalLink" />
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
