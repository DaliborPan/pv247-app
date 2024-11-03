import { type PropsWithChildren } from 'react';

export const DetailCard = ({
  children,
  title,
  actions
}: PropsWithChildren<{
  title?: React.ReactNode;
  actions?: React.ReactNode;
}>) => (
  <div className="p-8 mx-6 mt-8 bg-white rounded-lg shadow-lg">
    <div className="flex items-center mb-4 gap-x-2">
      <h3 className="text-xl grow">{title}</h3>

      {actions}
    </div>

    {children}
  </div>
);
