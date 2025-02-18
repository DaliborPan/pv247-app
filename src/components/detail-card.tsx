import { type PropsWithChildren } from 'react';

export const DetailCard = ({
  children,
  title,
  actions
}: PropsWithChildren<{
  title?: React.ReactNode;
  actions?: React.ReactNode;
}>) => (
  <div className="rounded-lg bg-white p-8 shadow-lg">
    <div className="mb-4 flex items-center gap-x-2">
      <h3 className="grow text-xl">{title}</h3>

      {actions}
    </div>

    {children}
  </div>
);
