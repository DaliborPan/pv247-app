'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { type PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => (
  <SessionProvider>
    <QueryClientProvider client={queryClient}>
      {children}

      <Toaster richColors />
    </QueryClientProvider>
  </SessionProvider>
);
