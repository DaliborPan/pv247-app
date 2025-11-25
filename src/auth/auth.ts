import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import { db } from '../db';
import {
  users as user,
  account,
  session,
  verification
} from '../db/schema/users';

export const auth = betterAuth({
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
        defaultValue: 'student'
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
        type: 'string'
      },
      projectId: {
        type: 'string'
      }
    }
  },
  session: {
    additionalFields: {
      role: {
        type: 'string'
      }
    }
  } // TODO: Add plugin or API route middleware to handle user role assignment
  // after social sign-in. The logic should:
  // 1. Check if user.email is in LECTOR_EMAILS
  // 2. Set role to 'lector' or 'student'
  // 3. If student, assign lectorId via getNewStudentLectorIdQuery()
  // 4. Update user via updateUser()
  // 5. Revalidate getStudentsWithHomeworkCached
});
