'use client';

import { type PropsWithChildren, useState } from 'react';

import { LiveCodeWrapper } from '@/components/mdx';

export const CorrectState = ({ children }: PropsWithChildren) => {
	const [name, setName] = useState('');

	const onNameChange = (newName: string) => {
		setName(newName);
	};

	return (
		<LiveCodeWrapper codeBlock={children} childrenWrapperClassName="p-4">
			<form>
				<span className="text-gray-500">form</span>
				<input onChange={e => onNameChange(e.target.value)} type="text" />
				<span className="block mt-4 text-gray-500">name</span>
				<span>{name}</span>
			</form>
		</LiveCodeWrapper>
	);
};
