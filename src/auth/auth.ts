import NextAuth, { type NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { eq } from 'drizzle-orm';

import { db } from '../db';
import { users } from '../db/schema/users';

import { CustomDrizzleAdapter } from './adapter';

const LECTOR_EMAILS = process.env.LECTOR_EMAILS?.split(';') ?? [];

const getIsProtectedPath = (path: string) => {
	const paths = ['/'];

	return paths.some(p => path.startsWith(p));
};

export const authOptions = {
	providers: [GitHub],
	adapter: CustomDrizzleAdapter,

	events: {
		/**
		 * At this point, user is already created in the database.
		 * We can update the user role based on the email.
		 */
		createUser: async ({ user }) => {
			if (!user.email) {
				return;
			}

			try {
				await db
					.update(users)
					.set({
						role: LECTOR_EMAILS.includes(user.email) ? 'lector' : 'student'
					})
					.where(eq(users.email, user.email));
			} catch (e) {
				console.error(e);
			}
		}
	},
	callbacks: {
		session: ({ session, user }) => {
			session.user.id = user.id;
			session.user.role = user.role;

			return session;
		},
		authorized: ({ auth, request: { nextUrl } }) => {
			const isLoggedIn = !!auth?.user;

			const isProtected = getIsProtectedPath(nextUrl.pathname);

			if (!isLoggedIn && isProtected) {
				const redirectUrl = new URL('/api/auth/signin', nextUrl.origin);
				redirectUrl.searchParams.append('callbackUrl', nextUrl.href);

				return Response.redirect(redirectUrl);
			}

			return true;
		}
	}
} satisfies NextAuthConfig;

export const { handlers, auth, signOut } = NextAuth(authOptions);
