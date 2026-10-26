import Link from 'next/link';

import { buttonVariants } from '@/components/base/button/button';
import { getSession } from '@/modules/session-user/session-user';

import { getMyProjectQuery } from '../queries';

export const MyProjectLink = async () => {
  const user = await getSession();

  if (user?.role !== 'student') {
    return null;
  }

  const project = await getMyProjectQuery();

  return (
    <Link href="/project" className={buttonVariants()}>
      {project ? 'My project' : 'Create project'}
    </Link>
  );
};
