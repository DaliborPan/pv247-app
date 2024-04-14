import { eq } from 'drizzle-orm';

import { auth } from '@/auth';
import { db } from '@/db';
import { DataTable } from '@/components/data-table/data-table';
import { TabsContent } from '@/components/base/tabs';
import { query, type GetStudentWithHomeworksResult } from '@/db/query';

import { LectorTabsTable } from '../_components/lector-tabs-table';

import { columns } from './_components/columns';

const StudentDataTable = ({
	students
}: {
	students: GetStudentWithHomeworksResult;
}) => (
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
);

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

	return (
		<LectorTabsTable
			title="Students"
			tabsHidden={!hasOwnStudents}
			triggers={[
				{
					href: '/lector/students?type=all',
					label: 'All students',
					value: 'all'
				},
				{
					href: '/lector/students?type=own',
					label: 'Own students',
					value: 'own'
				}
			]}
			contents={
				<>
					<TabsContent value="all">
						<StudentDataTable
							students={await query.student.getStudentsWithHomeworks()}
						/>
					</TabsContent>
					<TabsContent value="own">
						<StudentDataTable students={user?.students ?? []} />
					</TabsContent>
				</>
			}
		/>
	);
};

export default Page;
