'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Pencil, Send } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/base/button';
import { Form } from '@/components/form';
import { FormInput } from '@/components/form/form-fields/form-input';

import { useSetHomeworkPointsMutation } from './mutation';
import {
  type SetHomeworkPointsFormSchema,
  setHomeworkPointsFormSchema
} from './schema';

export const SetHomeworkPointsForm = ({
  defaultValues
}: {
  defaultValues: Partial<SetHomeworkPointsFormSchema>;
}) => {
  const hasPoints = defaultValues.points !== undefined;

  const [isEditing, setIsEditing] = useState(!hasPoints);

  const form = useForm<SetHomeworkPointsFormSchema>({
    resolver: zodResolver(setHomeworkPointsFormSchema),
    defaultValues
  });

  const mutation = useSetHomeworkPointsMutation({ isCreating: !hasPoints });

  const onSubmit = (data: SetHomeworkPointsFormSchema) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success('Points were successfully set');
      },
      onError: () => {
        toast.error('Failed to set points');
      },
      onSettled: () => {
        setIsEditing(false);
      }
    });
  };

  return isEditing ? (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-x-2"
      >
        <FormInput type="number" name="points" className="h-9" />
        <Button
          size="sm"
          isLoading={mutation.isPending}
          type="submit"
          variant={isEditing ? 'primary' : 'outline/primary'}
          iconLeft={{ icon: isEditing ? <Send /> : <Pencil /> }}
        />
      </form>
    </Form>
  ) : (
    <div className="flex items-center gap-x-2">
      <div className="grow">{defaultValues?.points} points</div>
      <Button
        size="sm"
        type="button"
        onClick={() => setIsEditing(true)}
        variant="outline/primary"
        iconLeft={{ icon: <Pencil /> }}
      />
    </div>
  );
};
