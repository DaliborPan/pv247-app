'use client';

import { type PropsWithChildren, useEffect, useRef, useState } from 'react';
import { ArrowDownFromLine, ArrowUpFromLine } from 'lucide-react';

import { cn } from '@/lib/cn';

import { Button } from '../base/button';

export const MdxCodeBlock = ({ children }: PropsWithChildren<object>) => {
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState<number>(Infinity);

  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    setHeight(ref.current?.offsetHeight ?? Infinity);
  }, []);

  return (
    <pre
      ref={ref}
      className={cn(
        'p-4 my-6 bg-[#0c0c1a] rounded-lg shadow [&>code]:px-0 [&>code]:bg-transparent overflow-y-hidden relative',
        !expanded &&
          height > 321 &&
          'max-h-[322px] after:content-[""] after:absolute after:inset-x-0 after:bottom-0 after:h-20 after:bg-gradient-to-b after:from-transparent after:to-gray-700'
      )}
    >
      {height > 321 && height !== Infinity && (
        <div className="absolute font-sans lg:top-4 bottom-4 right-4 z-20">
          <Button
            variant="outline"
            onClick={() => setExpanded(!expanded)}
            size="sm"
            iconLeft={{
              icon: expanded ? <ArrowUpFromLine /> : <ArrowDownFromLine />
            }}
          >
            {expanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      )}

      {children}
    </pre>
  );
};
