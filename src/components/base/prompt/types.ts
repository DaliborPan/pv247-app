import { type PropsWithChildren } from 'react';
import { type DefaultValues } from 'react-hook-form';
import { type z } from 'zod';

import { type DialogContentProps } from '../dialog';

type ConfirmComponent = (state: {
	isLoading: boolean;
	isError: boolean;
}) => React.ReactNode;

export type DecisionFnParams<T> =
	| { confirmed: false; data: undefined }
	| { confirmed: true; data: T };

export type DecisionFn<T> = (
	params: DecisionFnParams<T>
) => Promise<void> | void;

/**
 * You need to pass dialog trigger as `children`.
 * You can pass dialog props (such as size, etc.) as `dialogProps`.
 * You can define your own confirm and cancel buttons as `confirm` and `cancel` props.
 */
export type PromptProps<T> = PropsWithChildren<{
	onDecision: DecisionFn<T>;
	content: React.ReactNode;

	title?: string;
	subtitle?: string;

	dialogProps?: DialogContentProps;
	onError?: (error: unknown) => void;
	cancel?: React.ReactNode;

	/**
	 * If you want to control the open state, you can pass `open` and `onOpenChange` props.
	 */
	open?: boolean;
	onOpenChange?: (open: boolean) => void;

	formSchema: z.ZodSchema<T>;
	defaultValues?: DefaultValues<T>;
	onFormValidationFailed?: () => void;

	/**
	 * Don't provide `onClick` to confirm button. Provide `onDecision` instead,
	 * which is automatically binded to `confirm` element.
	 */
	confirm?: ConfirmComponent;
}>;
