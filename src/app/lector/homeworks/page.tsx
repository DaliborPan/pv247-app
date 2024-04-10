import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { db } from '@/db';
import { DataTable } from '@/components/data-table/data-table';
import { query } from '@/db/query';
import { homeworkSlugSchema } from '@/schema/homework';

import { columns } from './_components/columns';
import { HomeworksNavigation } from './_components/homeworks-navigation';

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

	const students = hasOwnStudents
		? user.students
		: await db.query.users.findMany({
				where: users => eq(users.role, 'student'),
				with: {
					homeworksStudent: true
				}
			});

	const lectures = await query.getOrderedLectures();

	const lecture = lectures.find(
		lecture => lecture.homeworkSlug === searchParamSlug
	);

	return (
		<div>
			<h1 className="mb-6 text-3xl">{hasOwnStudents && 'My '}Homeworks</h1>

			<div className="flex items-center mb-4">
				<div className="grow">
					<span className="text-sm text-gray-600">Name</span>
					<h2 className="-mt-1 text-2xl text-primary">
						{lecture?.homeworkName}
					</h2>
				</div>

				<HomeworksNavigation homeworkSlug={searchParamSlug} />
			</div>

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
							lectorId: session.user.id,
							studentId: student.id,
							points
						}
					};
				})}
				columns={columns}
			/>
		</div>
	);
};

export default Page;
