'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

import { TooltipProvider } from '@/components/base/tooltip/tooltip';

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>{children}</TooltipProvider>

    <Toaster richColors />
  </QueryClientProvider>
);
