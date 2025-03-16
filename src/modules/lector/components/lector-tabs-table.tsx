'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/base/tabs';

export const LectorTabsTable = ({
  contents,
  title,
  triggers
}: {
  contents: React.ReactNode;
  triggers: { value: string; label: string; href: string }[];
  title: string;
}) => {
  const searchParams = useSearchParams();
  const viewType = searchParams.get('type') ?? 'all';

  return (
    <Tabs defaultValue={viewType}>
      <div className="mb-6 flex items-center gap-x-2">
        <h1 className="hidden grow text-4xl lg:block">{title}</h1>

        {triggers.length !== 0 && (
          <TabsList>
            {triggers.map(({ value, label, href }) => (
              <TabsTrigger key={value} value={value} asChild>
                <Link href={href}>{label}</Link>
              </TabsTrigger>
            ))}
          </TabsList>
        )}
      </div>

      {contents}
    </Tabs>
  );
};
