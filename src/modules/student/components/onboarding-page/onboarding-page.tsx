import { getSessionUser } from '@/modules/session-user/server';

import { OnboardingForm } from './onboarding-form';

export const OnboardingPage = async () => {
  const user = await getSessionUser();

  return (
    <div className="container mt-8">
      <h1 className="mb-4 text-2xl md:text-5xl md:font-light">
        Welcome to the PV247 course application
      </h1>

      <p className="mb-8 text-sm text-gray-700 md:text-base">
        In this web application, you will find all information and study
        materials.{' '}
      </p>

      <OnboardingForm userId={user.id} />
    </div>
  );
};
