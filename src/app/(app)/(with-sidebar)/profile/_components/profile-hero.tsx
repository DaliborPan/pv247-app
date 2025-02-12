import { getSessionUser } from '@/modules/session-user/server';
import { Hero } from '@/components/base/hero';
import { EditProfileAction } from '@/modules/student/components/edit-profile-action';

const ProfileHeroContent = async () => {
  const user = await getSessionUser();

  const displayName =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.name;

  const displayRole =
    user.role === 'student' ? 'Course Student' : 'Course Teacher';

  return (
    <>
      <div className="rounded-full shadow size-20 bg-gradient-to-tr from-primary-100 to-primary-300" />

      <div>
        <div className="text-2xl font-medium text-slate-900">{displayName}</div>
        <div className="text-sm text-gray-500">{displayRole}</div>
      </div>
    </>
  );
};

const getDefaultValues = async () => {
  const user = await getSessionUser();

  return {
    id: user.id,
    firstName: user.firstName ?? undefined,
    lastName: user.lastName ?? undefined,
    github: user.github ?? undefined
  };
};

export const ProfileHero = () => (
  <Hero
    actions={<EditProfileAction defaultValuesPromise={getDefaultValues()} />}
  >
    <ProfileHeroContent />
  </Hero>
);
