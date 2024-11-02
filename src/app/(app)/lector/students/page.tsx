import { DataTable } from '@/components/data-table/data-table';
import { TabsContent } from '@/components/base/tabs';
import { getLectorStudents } from '@/db/session-user-service/lector-students';
import {
	getStudentsWithHomeworks,
	type GetStudentsWithHomeworksResult
} from '@/modules/student/server';

import { LectorTabsTable } from '../_components/lector-tabs-table';

import { columns } from './_components/columns';

const StudentDataTable = ({
	students
}: {
	students: GetStudentsWithHomeworksResult;
}) => (
	<DataTable
		data={students.map(student => ({
			...student,
			fullName: !student.firstName
				? ''
				: `${student.firstName} ${student.lastName}`,
			// TODO: attendance
			// attendance: 4,
			homeworkPoints: student.homeworksStudent.reduce(
				(acc, hw) => acc + hw.points,
				0
			)
		}))}
		columns={columns}
	/>
);

const Page = async () => {
	const lectorStudents = await getLectorStudents();
	const hasOwnStudents = !!lectorStudents.length;

	return (
		<LectorTabsTable
			title="Students"
			triggers={
				!hasOwnStudents
					? []
					: [
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
						]
			}
			contents={
				<>
					<TabsContent value="all">
						<StudentDataTable students={await getStudentsWithHomeworks()} />
					</TabsContent>

					<TabsContent value="own">
						<StudentDataTable students={lectorStudents} />
					</TabsContent>
				</>
			}
		/>
	);
};

export default Page;
