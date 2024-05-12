import { redirect } from 'next/navigation';

import { getSessionUser } from '@/auth/session-user';
import { homeworkSlugSchema, type Lecture } from '@/db';
import { DataTable } from '@/components/data-table/data-table';
import { type GetStudentWithHomeworksResult, query } from '@/db/query';
import { TabsContent } from '@/components/base/tabs';
import { LabeledValue } from '@/components/labeled-value';
import { getOrderedLectures } from '@/db/query/lectures';
import { getLectorStudents } from '@/db/session-user-service/lector-students';

import { LectorTabsTable } from '../../_components/lector-tabs-table';

import { columns } from './_components/columns';
import { HomeworksNavigation } from './_components/homeworks-navigation';
import { type SetHomeworkPointsFormSchema } from './_components/set-homework-points-form';

const StudentDataTable = async ({
	students,
	lecture
}: {
	students: GetStudentWithHomeworksResult;
	lecture?: Lecture;
}) => {
	const sessionUser = await getSessionUser();

	return (
		<DataTable
			data={students.map(student => {
				const defaultValues: Partial<SetHomeworkPointsFormSchema> = {
					lecture,
					lectorId: sessionUser.id,
					studentId: student.id,
					points: student.homeworksStudent.find(
						hw => hw.lectureId === lecture?.id
					)?.points
				};

				return {
					...student,
					fullName: !student.firstName
						? ''
						: `${student.firstName} ${student.lastName}`,
					defaultValues
				};
			})}
			columns={columns}
		/>
	);
};

const Page = async ({
	params
}: {
	params: {
		slug: string;
	};
}) => {
	const parsedSlug = homeworkSlugSchema.safeParse(
		params.slug ?? homeworkSlugSchema.options[0]
	);

	if (!parsedSlug.success) {
		redirect('/');
	}

	const paramSlug = parsedSlug.data;

	const lectorStudents = await getLectorStudents();
	const hasOwnStudents = !!lectorStudents.length;

	const lectures = await getOrderedLectures();
	const lecture = lectures.find(lecture => lecture.homeworkSlug === paramSlug);

	return (
		<LectorTabsTable
			title="Homework evaluation"
			triggers={
				!hasOwnStudents
					? []
					: [
							{
								href: `/lector/homeworks/${paramSlug}?type=all`,
								label: 'All students',
								value: 'all'
							},
							{
								href: `/lector/homeworks/${paramSlug}?type=own`,
								label: 'My students',
								value: 'own'
							}
						]
			}
			contents={
				<>
					<div className="flex items-center py-2 pl-4 mb-4 rounded-lg shadow bg-gray-50">
						<div className="grow">
							<LabeledValue label="Name">
								<h2 className="text-2xl text-primary">
									{lecture?.homeworkName}
								</h2>
							</LabeledValue>
						</div>

						<HomeworksNavigation homeworkSlug={paramSlug} />
					</div>

					<TabsContent value="all">
						<StudentDataTable
							students={await query.student.getStudentsWithHomeworks()}
							lecture={lecture}
						/>
					</TabsContent>

					<TabsContent value="own">
						<StudentDataTable students={lectorStudents} lecture={lecture} />
					</TabsContent>
				</>
			}
		/>
	);
};

export default Page;
