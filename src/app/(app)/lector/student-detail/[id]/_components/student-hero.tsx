import { Hero } from '@/components/base/hero';
import { type UserType } from '@/modules/user/schema';

export const StudentHero = ({ student }: { student: UserType }) => {
  const displayName = student.firstName
    ? `${student.firstName} ${student.lastName}`
    : student.name;

  return (
    <Hero>
      <div className="size-20 rounded-full bg-gradient-to-tr from-primary-100 to-primary-300 shadow" />
      <div>
        <div className="text-2xl font-medium">{displayName}</div>
        <div className="text-sm text-text-terciary">Course student</div>
      </div>
    </Hero>
  );
};
