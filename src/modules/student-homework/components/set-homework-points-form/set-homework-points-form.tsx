'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Send } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/base/button/button';
import { Form } from '@/components/form/form';
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

  const mutation = useSetHomeworkPointsMutation();

  const onSubmit = async (data: SetHomeworkPointsFormSchema) => {
    const [_, error] = await mutation.mutateAsync(data);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('Points were successfully set');
    setIsEditing(false);
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
