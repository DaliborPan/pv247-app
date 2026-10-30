'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React, { type ComponentType, useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 as uuid } from 'uuid';

import { Form } from '@/components/form/form';

import { Dialog } from '../dialog/dialog';
import { type DecisionFn, type PromptProps } from './types';

export const Prompt = <T extends FieldValues>({
  children,
  dialogProps = { size: 'm' },
  content,
  title,
  subtitle,
  cancel,
  confirm,
  onDecision,
  onError,
  formSchema,
  defaultValues,
  onFormValidationFailed,

  open: controlledOpen,
  onOpenChange: onControlledOpenChange
}: PromptProps<T> & { Content?: ComponentType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState(() => uuid());

  const isControlled = controlledOpen !== undefined;

  const handleOpenChange = (open: boolean) => {
    if (!isControlled) {
      setIsOpen(open);
    }

    onControlledOpenChange?.(open);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const {
    mutate: decisionMutate,
    isError,
    isPending: isLoading,
    reset: resetDecision
  } = useMutation({
    mutationFn: async (params: Parameters<DecisionFn<T>>[0]) =>
      await onDecision(params),
    retry: false,
    onError:
      onError ??
      (error => {
        toast.error(
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.'
        );
      })
  });

  const onSubmit = (data: T) => {
    if (isLoading) return;

    decisionMutate(
      { confirmed: true, data },
      {
        onSuccess: () => handleOpenChange(false)
      }
    );
  };

  return (
    <Dialog
      open={isControlled ? controlledOpen : isOpen}
      onOpenChange={newState => {
        if (isLoading) return;

        handleOpenChange(newState);

        if (newState) {
          // reset form on open
          form.reset(defaultValues);
          resetDecision();
          setKey(uuid());
        }

        if (!newState) {
          // set decision to false on close
          decisionMutate({ confirmed: false, data: undefined });
        }
      }}
    >
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Content showClose={!!title} {...dialogProps}>
        <Form key={key} {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onFormValidationFailed)}>
            {title && (
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>

                {subtitle && <Dialog.Subtitle>{subtitle}</Dialog.Subtitle>}
              </Dialog.Header>
            )}

            <fieldset disabled={isLoading}>
              {content}

              <Dialog.Footer>
                <Dialog.Close asChild>
                  {cancel ?? <Dialog.CancelButton />}
                </Dialog.Close>

                {confirm ? (
                  confirm({ isError, isLoading })
                ) : (
                  <Dialog.ConfirmButton
                    type="submit"
                    isError={isError}
                    isLoading={isLoading}
                  />
                )}
              </Dialog.Footer>
            </fieldset>
          </form>
        </Form>
      </Dialog.Content>
    </Dialog>
  );
};
