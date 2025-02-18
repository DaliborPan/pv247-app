import { type PropsWithChildren } from 'react';

export type HeroProps = PropsWithChildren<{
  actions?: React.ReactNode;
}>;

export const Hero = ({ actions, children }: HeroProps) => (
  <>
    <div className="hidden rounded-lg bg-gradient-to-tr from-primary-100 to-primary py-28 lg:block" />

    <div className="relative flex rounded-lg bg-white p-8 shadow-lg lg:mx-6 lg:-mt-20">
      <div className="flex grow items-center gap-x-6">{children}</div>

      <div className="absolute right-4 top-4 flex items-center gap-x-2">
        {actions}
      </div>
    </div>
  </>
);
