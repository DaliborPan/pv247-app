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
        <span className="text-text-terciary">form</span>
        <input
          onChange={e => {
            onNameChange(e.target.value);
          }}
          type="text"
        />
        <span className="mt-4 text-text-terciary">name</span>
        <span>{name}</span>
      </form>
    </LiveCodeWrapper>
  );
};
