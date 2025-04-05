import { z } from 'zod';

export const dbLectureSlugSchema = z.enum([
  'introduction',
  'react',
  'styling',
  'hooks',
  'other-hooks-refs-tables',
  'async-forms',
  'nextjs',
  'suspense-streaming-rsc',
  'api-configs-server-actions-database',
  'authentication-metadata-deployment'
]);
