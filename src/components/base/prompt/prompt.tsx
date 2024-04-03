import { zodResolver } from '@hookform/resolvers/zod';
import { Slot } from '@radix-ui/react-slot';
import { useMutation } from '@tanstack/react-query';
import React, { type ComponentType, useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';

import { Form } from '@/components/form/form';

import { Dialog } from '../dialog';

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

	if (Object.entries(form.formState.errors).length > 0) {
		console.log('values', form.getValues());
		console.error('form errors', form.formState.errors);
	}

	const {
		mutate: decisionMutate,
		isError,
		isPending: isLoading
	} = useMutation({
		mutationFn: async (params: Parameters<DecisionFn<T>>[0]) =>
			await onDecision(params)
	});

	const onSubmit = async () => {
		const valid = await form.trigger();

		if (!valid) {
			onFormValidationFailed?.();
			return;
		}

		decisionMutate(
			{ confirmed: true, data: form.getValues() },
			{
				onSuccess: () => handleOpenChange(false),
				onError
			}
		);
	};

	return (
		<Dialog
			open={isControlled ? controlledOpen : isOpen}
			onOpenChange={newState => {
				handleOpenChange(newState);

				if (newState) {
					// reset form on open
					form.reset(defaultValues);
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
					<form onSubmit={form.handleSubmit(onSubmit)}>
						{title && (
							<Dialog.Header>
								<Dialog.Title>{title}</Dialog.Title>

								{subtitle && <Dialog.Subtitle>{subtitle}</Dialog.Subtitle>}
							</Dialog.Header>
						)}

						{content}

						<Dialog.Footer>
							<Dialog.Close asChild>
								{cancel ?? <Dialog.CancelButton />}
							</Dialog.Close>

							<Slot onClick={onSubmit}>
								{confirm ? (
									confirm({ isError, isLoading })
								) : (
									<Dialog.ConfirmButton isLoading={isLoading} />
								)}
							</Slot>
						</Dialog.Footer>
					</form>
				</Form>
			</Dialog.Content>
		</Dialog>
	);
};
