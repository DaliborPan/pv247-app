import { eq } from 'drizzle-orm';

import { auth } from '@/auth';
import { db } from '@/db';
import { DataTable } from '@/components/data-table/data-table';

import { columns } from './_components/columns';

const Page = async ({
	searchParams
}: {
	searchParams: {
		slug: string;
	};
}) => {
	const session = await auth();

	// TODO: redirect if incorrect slug

	if (!session?.user) {
		return null;
	}

	const user = await db.query.users.findFirst({
		where: users => eq(users.id, session.user.id ?? ''),
		with: {
			students: {
				with: {
					homeworksStudent: true
				}
			}
		}
	});

	const hasOwnStudents = !!user?.students.length;

	const students = hasOwnStudents
		? user.students
		: await db.query.users.findMany({
				where: users => eq(users.role, 'student'),
				with: {
					homeworksStudent: true
				}
			});

	const lectures = await db.query.lectures.findMany();

	const lectureId = lectures.find(
		lecture => lecture.homeworkSlug === searchParams.slug
	)?.id;

	return (
		<div>
			<h1 className="mb-6 text-3xl">{hasOwnStudents && 'My '}Homeworks</h1>

			<div className="flex mb-4">
				<h2 className="grow">Homework name</h2>

				<div className="flex gap-x-4">
					<button>prev</button>
					<button>next</button>
				</div>
			</div>

			<DataTable
				data={students.map(student => ({
					...student,
					fullName: !student.firstName
						? ''
						: `${student.firstName} ${student.lastName}`,
					points:
						student.homeworksStudent.find(hw => hw.lectorId === lectureId)
							?.points ?? ''
				}))}
				columns={columns}
			/>
		</div>
	);
};

export default Page;
