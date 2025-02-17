import { getSessionUser } from '@/modules/session-user/server';

import { OnboardingForm } from './onboarding-form';

export const OnboardingPage = async () => {
  const user = await getSessionUser();

  return (
    <div className="container mt-8">
      <h1 className="text-2xl md:text-5xl md:font-light mb-4">
        Welcome to the PV247 course application
      </h1>

      <p className="text-gray-700 mb-8 text-sm md:text-base">
        In this web application, you will find all information and study
        materials.{' '}
      </p>

      <OnboardingForm userId={user.id} />
    </div>
  );
};
