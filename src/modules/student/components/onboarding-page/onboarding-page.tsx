import { OnboardingForm } from './onboarding-form';

export const OnboardingPage = () => (
  <div className="container lg:mt-8">
    <h1 className="mb-4 text-2xl lg:text-5xl lg:font-light">
      Welcome to the PV247 course application!
    </h1>

    <p className="mb-8 text-sm text-text-secondary md:text-base">
      In this web application, you will find all information and study
      materials.{' '}
    </p>

    <OnboardingForm />
  </div>
);
