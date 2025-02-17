import { type PropsWithChildren } from 'react';

export type HeroProps = PropsWithChildren<{
  actions?: React.ReactNode;
}>;

export const Hero = ({ actions, children }: HeroProps) => (
  <>
    <div className="rounded-lg bg-gradient-to-tr from-primary-100 to-primary py-28" />

    <div className="relative mx-6 -mt-20 flex rounded-lg bg-white p-8 shadow-lg">
      <div className="flex grow items-center gap-x-6">{children}</div>

      <div className="absolute right-4 top-4 flex items-center gap-x-2">
        {actions}
      </div>
    </div>
  </>
);
