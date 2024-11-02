import { redirect } from 'next/navigation';

import { getStudent } from '@/modules/student/server';
import { StudentHomeworkCard } from '@/modules/student/components/student-homework-card';

import { StudentOverviewCard } from './_components/student-overview-card';
import { StudentHero } from './_components/student-hero';

const Page = async ({ params }: { params: { id: string } }) => {
	const student = await getStudent(params.id);

	if (!student) {
		redirect('/lector');
	}

	return (
		<div className="mb-8 mx-auto max-w-4xl">
			<StudentHero student={student} />
			<StudentOverviewCard student={student} />
			<StudentHomeworkCard userId={student.id} projectId={student.projectId} />
		</div>
	);
};

export default Page;
