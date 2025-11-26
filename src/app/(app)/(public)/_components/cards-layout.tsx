import { PropsWithChildren } from 'react';

export const CardsLayout = ({
  children,
  title
}: PropsWithChildren<{ title: string }>) => {
  return (
    <>
      <h1 className="mb-6 text-3xl">{title}</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">{children}</div>
    </>
  );
};
