import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import { db } from '@/db';
import { Hero } from '@/components/person-detail';

import { HomeworksCard } from './_components/homeworks';

const Page = async ({ params }: { params: { id: string } }) => {
	const student = await db.query.users.findFirst({
		where: users => eq(users.id, params.id),
		with: {
			homeworksStudent: true
		}
	});

	if (!student) {
		redirect('/lector');
	}

	const displayName = student.firstName
		? `${student.firstName} ${student.lastName}`
		: student.name;

	return (
		<main>
			<Hero>
				<div className="rounded-full shadow size-20 bg-gradient-to-tr from-primary-100 to-primary-300" />
				<div>
					<div className="text-2xl font-medium text-slate-900">
						{displayName}
					</div>
					<div className="text-sm text-gray-500">Course student</div>
				</div>
			</Hero>

			<HomeworksCard studentHomeworks={student.homeworksStudent} />
		</main>
	);
};

export default Page;
