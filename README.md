# PV247 app

GitHub homework repository setup: [deployment and recovery guide](docs/github-homework-repositories.md).

## Stažení domácích úkolů studentů vybraného lektora

Skript potřebuje v `.env` nastavené `DATABASE_URL`, `AUTH_TOKEN`,
`HOMEWORK_REVIEW_LECTOR_GITHUB` a přístup GitHub App (`GITHUB_APP_ID`,
`GITHUB_APP_PRIVATE_KEY`, `GITHUB_APP_INSTALLATION_ID`). Vyžaduje Node.js 20.6+ a Git.

```sh
pnpm clone:homeworks 1
# Například druhý úkol do vlastní složky:
pnpm clone:homeworks 2 /cesta/k/repozitarum
```

Číslo 1–9 určuje pořadí lekce podle `availableFrom`. Výchozí složka je
`homework-repos/lecture-<číslo>/` (ignorovaná Gitem); klony jsou v ní pojmenované
podle studentů. Pokud mají dva studenti stejné jméno, skript jejich klony přeskočí
a vypíše `Chyba`, aby nic nepřepsal. Skript vybere připravené repozitáře pro
zvolenou lekci, naklonuje je a přepne na jinou branch než `main` (pokud je jich
více, na branch s nejnovějším commitem). Klon obsahující
pouze `main` odstraní a vypíše studenta bez odevzdaného úkolu. Existující složky
nepřepisuje. Na terminál vypisuje pouze jméno studenta a stav (`Odevzdáno`,
`Neodevzdáno`, `Přeskočeno` nebo `Chyba`). Stejný přehled ukládá jako tabulku do
`RESULTS.md` v cílové složce; při dalším spuštění soubor přepíše.

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
