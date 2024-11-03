'use client';

import { type PropsWithChildren } from 'react';

import { LiveCodeWrapper } from '@/components/mdx';

export const IncorrectState = ({ children }: PropsWithChildren) => {
  let name = '';

  const onNameChange = (newName: string) => {
    name = newName;
  };

  return (
    <LiveCodeWrapper codeBlock={children} childrenWrapperClassName="p-4">
      <form className="flex flex-col">
        <span className="text-gray-500">form</span>
        <input
          onChange={e => {
            onNameChange(e.target.value);
          }}
          type="text"
        />
        <span className="mt-4 text-gray-500">name</span>
        <span>{name}</span>
      </form>
    </LiveCodeWrapper>
  );
};
