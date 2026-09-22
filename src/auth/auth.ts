import 'server-only';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import {
  getLectorWithLeastStudentsQuery,
  isLectorEmail
} from '@/modules/lector/queries';

import { db } from '../db';
import { user, account, session, verification } from '../db/schema/users/users';

const betterAuthUrl = process.env.BETTER_AUTH_URL;
const betterAuthSecret = process.env.BETTER_AUTH_SECRET;

if (!betterAuthUrl || !betterAuthSecret) {
  throw new Error(
    'BETTER_AUTH_URL and BETTER_AUTH_SECRET must be configured before starting the application.'
  );
}

export const auth = betterAuth({
  baseURL: betterAuthUrl,
  secret: betterAuthSecret,
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema: {
      user,
      account,
      session,
      verification
    }
  }),
  socialProviders: {
    github: {
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!
    }
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'student',
        input: false
      },
      firstName: {
        type: 'string'
      },
      lastName: {
        type: 'string'
      },
      github: {
        type: 'string'
      },
      lectorId: {
        type: 'string',
        input: false
      }
    }
  },
  account: {
    encryptOAuthTokens: true
  },
  session: {
    expiresIn: 3 * 7 * 24 * 60 * 60, // 3 weeks (seconds — Better Auth uses seconds, not ms)
    additionalFields: {
      role: {
        type: 'string'
      }
    }
  },
  databaseHooks: {
    user: {
      create: {
        before: async userData => {
          const isLector = isLectorEmail(userData.email);

          if (isLector) {
            return {
              data: {
                role: 'lector',
                lectorId: null
              }
            };
          }

          const lectorId = await getLectorWithLeastStudentsQuery();

          return {
            data: {
              role: 'student',
              lectorId
            }
          };
        }
      }
    }
  }
});
