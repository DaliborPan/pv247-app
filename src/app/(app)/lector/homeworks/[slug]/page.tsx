import { redirect } from 'next/navigation';

import { homeworkSlugSchema, type Lecture } from '@/db';
import { DataTable } from '@/components/data-table/data-table';
import { TabsContent } from '@/components/base/tabs';
import { LabeledValue } from '@/components/labeled-value';
import { getOrderedLectures } from '@/modules/lecture/server';
import {
	getStudentsWithHomeworks,
	type GetStudentsWithHomeworksResult
} from '@/modules/student/server';
import { getMineStudents, getSessionUser } from '@/modules/session-user/server';
import { LectorTabsTable } from '@/modules/lector/components';

import { columns } from './_components/columns';
import { HomeworksNavigation } from './_components/homeworks-navigation';
import { type SetHomeworkPointsFormSchema } from './_components/set-homework-points-form';

const StudentDataTable = async ({
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

	const lectorStudents = await getMineStudents();
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
							students={await getStudentsWithHomeworks()}
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
