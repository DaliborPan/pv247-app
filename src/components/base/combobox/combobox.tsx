'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, LucideIcon } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/cn';

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '../command/command';
import { Popover, PopoverContent, PopoverTrigger } from '../popover/popover';
import { Button, type ButtonProps } from '../button';

export type ComboboxOption = {
	value: string;
	label: string;
};

export type ComboboxProps = {
	onSelect: (value: string) => void;
	value: string;
	options: ComboboxOption[];
	emptyMessage?: string;
	searchPlaceholder?: string;
	triggerPlaceholder?: string;
	triggerButtonProps?: Partial<ButtonProps>;

	trigger?: React.ReactNode;
	TriggerIcon?: LucideIcon;
};

export const Combobox = ({
	onSelect,
	value,
	options,
	emptyMessage,
	searchPlaceholder,
	triggerPlaceholder,
	triggerButtonProps,
	trigger,
	TriggerIcon = ChevronsUpDown
}: ComboboxProps) => {
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				{trigger ?? (
					<Button
						variant="outline"
						role="combobox"
						{...triggerButtonProps}
						className={cn(
							'w-[200px] flex justify-between',
							triggerButtonProps?.className
						)}
						aria-expanded={open}
					>
						{value
							? options.find(option => option.value === value)?.label
							: triggerPlaceholder}
						<TriggerIcon className="ml-2 size-4 shrink-0 opacity-50" />
					</Button>
				)}
			</PopoverTrigger>

			<PopoverContent className="w-[200px] p-0">
				<Command
					filter={(_value, search, keywords = []) => {
						const searchValue = keywords.join(' ');

						return searchValue.toLowerCase().includes(search.toLowerCase())
							? 1
							: 0;
					}}
				>
					<CommandInput placeholder={searchPlaceholder} />

					<CommandList>
						{emptyMessage && <CommandEmpty>{emptyMessage}</CommandEmpty>}

						<CommandGroup>
							{options.map(option => (
								<CommandItem
									key={option.value}
									value={option.value}
									onSelect={currentValue => {
										onSelect(currentValue);
										setOpen(false);
									}}
									keywords={[option.label]}
								>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											value === option.value ? 'opacity-100' : 'opacity-0'
										)}
									/>
									{option.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
