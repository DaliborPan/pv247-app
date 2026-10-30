'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { type ComponentProps } from 'react';

import { cn } from '@/lib/cn';

import { DialogFooter } from '../dialog/dialog-footer';
import { DialogHeader } from '../dialog/dialog-header';

const Content = ({
  className,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Content>) => (
  <AlertDialogPrimitive.Portal>
    <AlertDialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60" />
    <AlertDialogPrimitive.Content
      className={cn(
        'fixed left-1/2 top-1/2 z-50 grid max-h-[calc(100vh-2rem)] w-full max-w-md -translate-x-1/2 -translate-y-1/2 gap-2 overflow-y-auto border bg-card p-6 shadow-lg sm:rounded-lg',
        className
      )}
      {...props}
    />
  </AlertDialogPrimitive.Portal>
);

const Title = (props: ComponentProps<typeof AlertDialogPrimitive.Title>) => (
  <AlertDialogPrimitive.Title
    className="text-lg font-medium leading-none tracking-tight"
    {...props}
  />
);

const Description = (
  props: ComponentProps<typeof AlertDialogPrimitive.Description>
) => (
  <AlertDialogPrimitive.Description
    className="text-sm text-muted-foreground"
    {...props}
  />
);

export const AlertDialog = Object.assign(AlertDialogPrimitive.Root, {
  Trigger: AlertDialogPrimitive.Trigger,
  Content,
  Header: DialogHeader,
  Title,
  Description,
  Footer: DialogFooter,
  Cancel: AlertDialogPrimitive.Cancel,
  Action: AlertDialogPrimitive.Action
});
