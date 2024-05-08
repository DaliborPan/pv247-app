import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { type User } from 'next-auth';

import { getSessionUser } from '@/auth';
import { db, homeworkSlugSchema, type Lecture } from '@/db';
import { DataTable } from '@/components/data-table/data-table';
import { type GetStudentWithHomeworksResult, query } from '@/db/query';
import { TabsContent } from '@/components/base/tabs';
import { LabeledValue } from '@/components/labeled-value';

import { LectorTabsTable } from '../../_components/lector-tabs-table';

import { columns } from './_components/columns';
import { HomeworksNavigation } from './_components/homeworks-navigation';

const StudentDataTable = ({
	students,
	lecture,
	sessionUser
}: {
	students: GetStudentWithHomeworksResult;
	lecture?: Lecture;
	sessionUser: User;
}) => (
	<DataTable
		data={students.map(student => {
			const points = student.homeworksStudent.find(
				hw => hw.lectureId === lecture?.id
			)?.points;

			return {
				...student,
				fullName: !student.firstName
					? ''
					: `${student.firstName} ${student.lastName}`,
				points: {
					lecture,
					lectorId: sessionUser.id,
					studentId: student.id,
					points
				}
			};
		})}
		columns={columns}
	/>
);

const Page = async ({
	params
}: {
	params: {
		slug: string;
	};
}) => {
	const sessionUser = await getSessionUser();

	const parsedSlug = homeworkSlugSchema.safeParse(
		params.slug ?? homeworkSlugSchema.options[0]
	);

	if (!parsedSlug.success) {
		redirect('/');
	}

	const paramSlug = parsedSlug.data;

	const user = await db.query.users.findFirst({
		where: users => eq(users.id, sessionUser.id ?? ''),
		with: {
			students: {
				with: {
					homeworksStudent: true
				}
			}
		}
	});

	const hasOwnStudents = !!user?.students.length;

	const lectures = await query.lectures.getOrderedLectures();
	const lecture = lectures.find(lecture => lecture.homeworkSlug === paramSlug);

	return (
		<LectorTabsTable
			title="Homework evaluation"
			tabsHidden={!hasOwnStudents}
			triggers={[
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
			]}
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
							sessionUser={sessionUser}
						/>
					</TabsContent>
					<TabsContent value="own">
						<StudentDataTable
							students={user?.students ?? []}
							lecture={lecture}
							sessionUser={sessionUser}
						/>
					</TabsContent>
				</>
			}
		/>
	);
};

export default Page;
