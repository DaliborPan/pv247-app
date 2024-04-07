import { eq } from 'drizzle-orm';

import { auth } from '@/auth';
import { db } from '@/db';
import { DataTable } from '@/components/data-table/data-table';

import { columns } from './_components/columns';

const Page = async () => {
	const session = await auth();

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

	return (
		<div>
			<h1 className="mb-6 text-3xl">{hasOwnStudents && 'My '}Students</h1>

			<DataTable
				data={students.map(student => ({
					...student,
					fullName: !student.firstName
						? ''
						: `${student.firstName} ${student.lastName}`,
					// TODO: attendance
					attendance: 4,
					homeworkPoints: student.homeworksStudent.reduce(
						(acc, hw) => acc + hw.points,
						0
					)
				}))}
				columns={columns}
			/>
		</div>
	);
};

export default Page;
