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
        <span className="text-text-terciary">form</span>
        <input onChange={e => onNameChange(e.target.value)} type="text" />
        <span className="mt-4 block text-text-terciary">name</span>
        <span>{name}</span>
      </form>
    </LiveCodeWrapper>
  );
};
