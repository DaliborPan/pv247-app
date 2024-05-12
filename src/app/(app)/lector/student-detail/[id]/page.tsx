import { redirect } from 'next/navigation';

import { HomeworksCard } from '@/components/person-detail';
import { getStudent } from '@/db/query/student';

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
			<HomeworksCard userId={student.id} />
		</div>
	);
};

export default Page;
