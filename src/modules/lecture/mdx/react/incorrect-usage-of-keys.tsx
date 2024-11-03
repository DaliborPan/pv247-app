'use client';

import { type PropsWithChildren, useState } from 'react';
import { RefreshCcw } from 'lucide-react';

import { Button } from '@/components/base/button';

export const IncorrectUsageOfKeys = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  return (
    <div className="flex flex-col lg:flex-row gap-x-4">
      {children}

      <div className="flex justify-center p-4 pt-10 my-6 rounded-lg shadow bg-primary-100 grow">
        <ul className="flex flex-col gap-y-1.5">
          {items.map((item, index) => (
            <li key={index}>
              <input type="text" />
              <span className="ml-2">{item}</span>
            </li>
          ))}

          <li className="mt-4">
            <Button
              variant="outline/primary"
              onClick={() => setItems([...items].reverse())}
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
