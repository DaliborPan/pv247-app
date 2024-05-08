import { useFormContext } from 'react-hook-form';

import { Input } from '@/components/base/input';
import { type InputProps } from '@/components/base/input/input';

import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage
} from '../form';

export type FormInputProps = InputProps & {
	name: string;
	description?: string;
};

export const FormInput = ({
	name,
	description,
	label,
	...inputProps
}: FormInputProps) => {
	const formContext = useFormContext();

	return (
		<FormField
			control={formContext.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}

					<FormControl>
						<Input {...field} {...inputProps} />
					</FormControl>

					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
