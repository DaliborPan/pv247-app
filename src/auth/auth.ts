import NextAuth, { type NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { eq } from 'drizzle-orm';

import { getNewStudentLectorId } from '@/db/query/lector';
import { db } from '@/db';
import { users } from '@/db/schema/users';

import { CustomDrizzleAdapter } from './adapter';

const LECTOR_EMAILS = process.env.LECTOR_EMAILS?.split(';') ?? [];

const PUBLIC_ROUTES = ['/login', '/lectures', '/homeworks', '/test'];

const LECTOR_PATHS_PREFIX = ['/lector'];

const getIsProtectedPath = (path: string) =>
	!PUBLIC_ROUTES.some(route => path.startsWith(route));

export const authOptions = {
	providers: [
		GitHub({
			clientId: process.env.AUTH_GITHUB_ID!,
			clientSecret: process.env.AUTH_GITHUB_SECRET!
		})
	],
	adapter: CustomDrizzleAdapter,

	pages: {
		signIn: '/login'
	},

	trustHost: true,

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
				const role = LECTOR_EMAILS.includes(user.email) ? 'lector' : 'student';
				const lectorId =
					role === 'student' ? await getNewStudentLectorId() : undefined;

				await db
					.update(users)
					.set({
						role,
						lectorId
					})
					.where(eq(users.email, user.email));
			} catch (e) {
				console.error("ERROR: Couldn't update user role");
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
		authorized: async ({ auth, request: { nextUrl } }) => {
			const isLoggedIn = !!auth?.user;

			const isProtected = getIsProtectedPath(nextUrl.pathname);

			if (!isLoggedIn && isProtected) {
				const redirectUrl = new URL('/api/auth/signin', nextUrl.origin);
				redirectUrl.searchParams.append('callbackUrl', nextUrl.href);

				return Response.redirect(redirectUrl);
			}

			const isLector = auth?.user?.role === 'lector';

			if (
				!isLector &&
				LECTOR_PATHS_PREFIX.some(prefix => nextUrl.pathname.startsWith(prefix))
			) {
				const redirectUrl = new URL('/lectures', nextUrl.origin);

				return Response.redirect(redirectUrl);
			}

			return true;
		}
	}
} satisfies NextAuthConfig;

export const { handlers, auth, signOut } = NextAuth(authOptions);
