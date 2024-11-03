import { type PropsWithChildren } from 'react';

export type HeroProps = PropsWithChildren<{
  actions?: React.ReactNode;
}>;

export const Hero = ({ actions, children }: HeroProps) => (
  <>
    <div className="rounded-lg bg-gradient-to-tr from-primary-100 to-primary py-28" />

    <div className="relative flex p-8 mx-6 -mt-20 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-x-6 grow">{children}</div>

      <div className="absolute flex items-center top-4 right-4 gap-x-2">
        {actions}
      </div>
    </div>
  </>
);
