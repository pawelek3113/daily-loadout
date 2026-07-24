# dailyloadout project

Created with web-template

---

## Getting started

```zsh
bun install
cp .env.example .env
# Update .env with your credentials
docker compose up -d
bun run dev
```

## Tech stack

- Bun
- React
- Next.js
- TypeScript
- tailwindcss
- tRPC
- Drizzle ORM
- PostgreSQL
- Playwright
- ESLint
- Docker

## Template includes

- ThemeProvider with ThemeToggleButton in `src/components/shared`
- tRPC router with example procedure
- tailwindcss configuration with theme toggle support
- PostgreSQL database connection with Drizzle ORM
- Prettier and ESLint configuration
- dummy e2e Playwright test
- GitHub Actions workflow
- `compose.yaml` for local development with PostgreSQL database
