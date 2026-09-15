'use server';

import { refresh } from 'next/cache';

import { authLectorServerAction } from '@/server/server-actions';
import {
  createHomeworkRepository,
  completeHomeworkRepository
} from '../../server/mutation';
import { GithubSetupError } from '@/integrations/github/client';

import { homeworkRepositoryInputSchema } from '../../schema';

export const createHomeworkRepositoryAction = authLectorServerAction
  .input(homeworkRepositoryInputSchema)
  .handler(async ({ input, ctx }) => {
    try {
      const result = await createHomeworkRepository(
        ctx.sessionUserLector,
        input
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

export const completeHomeworkRepositoryAction = authLectorServerAction
  .input(homeworkRepositoryInputSchema)
  .handler(async ({ input, ctx }) => {
    try {
      const result = await completeHomeworkRepository(
        ctx.sessionUserLector,
        input
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
