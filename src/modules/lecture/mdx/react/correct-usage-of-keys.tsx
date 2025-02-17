'use client';

import { type PropsWithChildren, useState } from 'react';
import { RefreshCcw } from 'lucide-react';

import { Button } from '@/components/base/button';

export const CorrectUsageOfKeys = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  return (
    <div className="flex flex-col gap-x-4 lg:flex-row">
      {children}

      <div className="my-6 flex grow justify-center rounded-lg bg-primary-100 p-4 pt-10 shadow">
        <ul className="flex flex-col gap-y-1.5">
          {items.map(item => (
            <li key={item}>
              <input type="text" />
              <span className="ml-2">{item}</span>
            </li>
          ))}

          <li className="mt-4">
            <Button
              variant="outline/primary"
              onClick={() => setItems(items.toReversed())}
              type="button"
              iconLeft={{
                icon: <RefreshCcw />,
                className: 'mr-2'
              }}
            >
              Reverse
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};
