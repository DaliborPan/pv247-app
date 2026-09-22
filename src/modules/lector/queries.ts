import 'server-only';
import { and, eq, inArray, sql } from 'drizzle-orm';

import { db } from '@/db';
import { user as users } from '@/db/schema/users/users';

const getLectorEmails = (): string[] =>
  (process.env.LECTOR_EMAILS ?? '')
    .split(/[;,]/)
    .map(email => email.trim().toLowerCase())
    .filter(Boolean);

export const isLectorEmail = (email: string) => {
  if (!email) return false;

  return getLectorEmails().includes(email.trim().toLowerCase());
};

export const getLectorWithLeastStudentsQuery = async (): Promise<
  string | null
> => {
  const lectorEmails = getLectorEmails();

  if (lectorEmails.length === 0) {
    return null;
  }

  const lectors = await db.query.users.findMany({
    columns: { id: true, lectorId: true },
    where: inArray(sql`lower(${users.email})`, lectorEmails)
  });

  if (lectors.length === 0) {
    return null;
  }

  const lectorIds = lectors.map(lector => lector.id);

  const studentCounts = await db
    .select({
      lectorId: users.lectorId,
      count: sql<number>`count(*)`
    })
    .from(users)
    .where(and(eq(users.role, 'student'), inArray(users.lectorId, lectorIds)))
    .groupBy(users.lectorId);

  const countsMap = new Map<string, number>(
    lectors.map(lector => [lector.id, 0])
  );

  for (const row of studentCounts) {
    if (row.lectorId) {
      countsMap.set(row.lectorId, Number(row.count));
    }
  }

  let minCount = Infinity;
  for (const count of countsMap.values()) {
    if (count < minCount) {
      minCount = count;
    }
  }

  const candidateLectors = lectors.filter(
    lector => (countsMap.get(lector.id) ?? 0) === minCount
  );

  const randomIndex = Math.floor(Math.random() * candidateLectors.length);
  return candidateLectors[randomIndex].id;
};
