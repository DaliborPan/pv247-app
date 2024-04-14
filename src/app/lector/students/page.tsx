import { eq } from 'drizzle-orm';
import Link from 'next/link';

import { auth } from '@/auth';
import { db } from '@/db';
import { DataTable } from '@/components/data-table/data-table';
import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent
} from '@/components/base/tabs';

import { columns } from './_components/columns';

const getStudentsWithHomeworks = () =>
	db.query.users.findMany({
		where: users => eq(users.role, 'student'),
		with: {
			homeworksStudent: true
		}
	});

type StudentsWithHomeworks = Awaited<
	ReturnType<typeof getStudentsWithHomeworks>
>;

const StudentDataTable = ({
	students
}: {
	students: StudentsWithHomeworks;
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

const Page = async ({
	searchParams
}: {
	searchParams: Record<string, string>;
}) => {
	const session = await auth();
	const viewType = searchParams.type ?? 'all';

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
		<Tabs defaultValue={viewType}>
			<div className="flex items-center mb-6 gap-x-2">
				<h1 className="text-3xl grow">Students</h1>

				{hasOwnStudents && (
					<TabsList>
						<TabsTrigger asChild value="all">
							<Link href="/lector/students?type=all">All students</Link>
						</TabsTrigger>
						<TabsTrigger asChild value="own">
							<Link href="/lector/students?type=own">Own students</Link>
						</TabsTrigger>
					</TabsList>
				)}
			</div>

			<TabsContent value="all">
				<StudentDataTable students={await getStudentsWithHomeworks()} />
			</TabsContent>
			<TabsContent value="own">
				<StudentDataTable students={user?.students ?? []} />
			</TabsContent>
		</Tabs>
	);
};

export default Page;
