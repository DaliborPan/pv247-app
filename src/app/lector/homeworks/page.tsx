import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { type User } from 'next-auth';

import { auth } from '@/auth';
import { db, homeworkSlugSchema, type Lecture } from '@/db';
import { DataTable } from '@/components/data-table/data-table';
import { type GetStudentWithHomeworksResult, query } from '@/db/query';
import { TabsContent } from '@/components/base/tabs';

import { LectorTabsTable } from '../_components/lector-tabs-table';

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
				points,
				setPoints: {
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
	searchParams
}: {
	searchParams: {
		slug: string;
	};
}) => {
	const session = await auth();
	if (!session?.user) {
		return null;
	}

	const parsedSlug = homeworkSlugSchema.safeParse(
		searchParams.slug ?? homeworkSlugSchema.options[0]
	);

	if (!parsedSlug.success) {
		redirect('/');
	}

	const searchParamSlug = parsedSlug.data;

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

	const lectures = await query.lectures.getOrderedLectures();
	const lecture = lectures.find(
		lecture => lecture.homeworkSlug === searchParamSlug
	);

	return (
		<LectorTabsTable
			title="Homeworks"
			tabsHidden={!hasOwnStudents}
			triggers={[
				{
					href: '/lector/homeworks?type=all',
					label: 'All homeworks',
					value: 'all'
				},
				{
					href: '/lector/homeworks?type=own',
					label: 'My homeworks',
					value: 'own'
				}
			]}
			contents={
				<>
					<div className="flex items-center mb-4">
						<div className="grow">
							<span className="text-sm text-gray-600">Name</span>
							<h2 className="-mt-1 text-2xl text-primary">
								{lecture?.homeworkName}
							</h2>
						</div>

						<HomeworksNavigation homeworkSlug={searchParamSlug} />
					</div>

					<TabsContent value="all">
						<StudentDataTable
							students={await query.student.getStudentsWithHomeworks()}
							lecture={lecture}
							sessionUser={session.user}
						/>
					</TabsContent>
					<TabsContent value="own">
						<StudentDataTable
							students={user?.students ?? []}
							lecture={lecture}
							sessionUser={session.user}
						/>
					</TabsContent>
				</>
			}
		/>
	);
};

export default Page;
