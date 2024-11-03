import { DataTable } from '@/components/data-table';
import { type Lecture } from '@/db';
import { type GetStudentsWithHomeworksResult } from '@/modules/student/server';
import { getSessionUser } from '@/modules/session-user/server';

import { columns } from './columns';

export const HomeworkStudentsDataTable = async ({
	students,
	lecture
}: {
	students: GetStudentsWithHomeworksResult;
	lecture?: Lecture;
}) => {
	const sessionUser = await getSessionUser();

	return (
		<DataTable
			data={students.map(student => {
				const defaultValues = {
					lecture,
					lectorId: sessionUser.id,
					studentId: student.id,
					points: student.homeworksStudent.find(
						hw => hw.lectureId === lecture?.id
					)?.points
				};

				return {
					...student,
					defaultValues
				};
			})}
			columns={columns}
		/>
	);
};
