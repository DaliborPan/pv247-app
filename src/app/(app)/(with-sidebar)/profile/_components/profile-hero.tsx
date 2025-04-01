import { getSessionUser } from '@/modules/session-user/server';
import { Hero } from '@/components/base/hero';
import { EditProfileAction } from '@/modules/student/components/edit-profile-action';

const ProfileHeroContent = async () => {
  const sessionUser = await getSessionUser();

  const displayName =
    sessionUser.firstName && sessionUser.lastName
      ? `${sessionUser.firstName} ${sessionUser.lastName}`
      : sessionUser.name;

  const displayRole =
    sessionUser.role === 'student'
      ? 'Course Student'
      : sessionUser.role === 'lector'
        ? 'Course Teacher'
        : '';

  return (
    <>
      <div className="hidden size-20 rounded-full bg-gradient-to-tr from-primary-100 to-primary-300 shadow lg:block" />

      <div className="pr-10 lg:pr-0">
        <div className="text-2xl font-medium">{displayName}</div>
        <div className="text-sm text-text-terciary">{displayRole}</div>
      </div>
    </>
  );
};

const getDefaultValues = async () => {
  const sessionUser = await getSessionUser();

  return {
    firstName: sessionUser.firstName ?? undefined,
    lastName: sessionUser.lastName ?? undefined,
    github: sessionUser.github ?? undefined
  };
};

export const ProfileHero = () => (
  <Hero
    actions={<EditProfileAction defaultValuesPromise={getDefaultValues()} />}
  >
    <ProfileHeroContent />
  </Hero>
);
