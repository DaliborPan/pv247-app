# PV247 app

The application used for the course PV247 Modern Development of User Interfaces and implemented as part of the diploma thesis.

## General stack

- Next.js 14, TypeScript
- Tanstack query
- Server actions
- SQLite (Turso), Drizzle ORM
- Next Auth
- React hook form + Zod
- Tanstack Table
- MDX
- Radix UI and Tailwindcss

## Local development setup

- Use `pnpm` to install dependencies

```
pnpm install
```

### env

- Create a database on [Turso](https://turso.tech/) - obtain `AUTH_TOKEN` from there
- Create OAuth application here on GitHub - obtain `CLIENT_ID` and `CLIENT_SECRET`
- Create `.env` file and set all variables mentioned in `.env.template`

### Running database locally

- install **turso CLI** and run

```
turso dev --db-file dev.db --port 8020
```

- local database will be running on port 8020. Make sure you specify the same port in your `.env`

### Running locally

- To run an application locally, run

```
pnpm dev
```
  
