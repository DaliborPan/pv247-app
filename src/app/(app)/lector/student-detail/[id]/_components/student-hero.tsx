import { Hero } from '@/components/person-detail';
import { type User } from '@/db';

export const StudentHero = ({ student }: { student: User }) => {
	const displayName = student.firstName
		? `${student.firstName} ${student.lastName}`
		: student.name;

	return (
		<Hero>
			<div className="rounded-full shadow size-20 bg-gradient-to-tr from-primary-100 to-primary-300" />
			<div>
				<div className="text-2xl font-medium text-slate-900">{displayName}</div>
				<div className="text-sm text-gray-500">Course student</div>
			</div>
		</Hero>
	);
};
