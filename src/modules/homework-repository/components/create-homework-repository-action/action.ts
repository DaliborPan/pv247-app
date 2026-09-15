'use server';

import { refresh } from 'next/cache';
import { z } from 'zod';

import { authStudentServerAction } from '@/server/server-actions';
import { homeworkRepositoryMutation } from '../../server/mutation';
import { GithubSetupError } from '@/integrations/github/client';

const ownHomeworkRepositoryInputSchema = z.object({
  lectureId: z.string().min(1)
});

export const createOwnHomeworkRepositoryAction = authStudentServerAction
  .input(ownHomeworkRepositoryInputSchema)
  .handler(async ({ input, ctx }) => {
    try {
      const result = await homeworkRepositoryMutation.create(
        ctx.sessionUserStudent,
        {
          lectureId: input.lectureId,
          studentId: ctx.sessionUserStudent.id
        }
      );
      return { result, error: null };
    } catch (error) {
      return {
        error:
          error instanceof GithubSetupError
            ? error.message
            : 'Repository setup failed. Refresh and try again.'
      };
    } finally {
      refresh();
    }
  });

export const completeOwnHomeworkRepositoryAction = authStudentServerAction
  .input(ownHomeworkRepositoryInputSchema)
  .handler(async ({ input, ctx }) => {
    try {
      const result = await homeworkRepositoryMutation.complete(
        ctx.sessionUserStudent,
        {
          lectureId: input.lectureId,
          studentId: ctx.sessionUserStudent.id
        }
      );
      return { result, error: null };
    } catch (error) {
      return {
        error:
          error instanceof GithubSetupError
            ? error.message
            : 'Repository setup failed. Refresh and try again.'
      };
    } finally {
      refresh();
    }
  });
