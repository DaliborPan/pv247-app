import { z } from 'zod';

export const dbHomeworkSlugSchema = z.enum([
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
