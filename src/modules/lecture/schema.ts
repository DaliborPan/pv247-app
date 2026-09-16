import { z } from 'zod';

export const lectureSlugSchema = z.enum([
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
export type LectureSlugType = z.infer<typeof lectureSlugSchema>;

export const homeworkSlugSchema = z.enum([
  'typescript',
  'react-basics',
  'styling',
  'state',
  'table-memo',
  'forms-async',
  'nextjs-basic',
  'rsc-forms',
  'api-actions-database',

  // Last lesson does not have a homework
  ''
]);
export type HomeworkSlugType = z.infer<typeof homeworkSlugSchema>;
