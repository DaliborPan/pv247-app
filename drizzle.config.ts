import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'sqlite',
	schema: './src/db/schema',
	driver: 'turso',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
		authToken: process.env.AUTH_TOKEN
	},
	out: '.drizzle'
});
