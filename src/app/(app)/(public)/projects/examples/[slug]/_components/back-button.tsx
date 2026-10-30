'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/base/button/button';

export const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="link"
      onClick={() => router.back()}
      iconLeft={{
        icon: <ArrowLeft aria-hidden="true" data-icon="inline-start" />
      }}
    >
      Back
    </Button>
  );
};
