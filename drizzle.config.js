import { defineConfig } from "drizzle-kit";

/**
 * Drizzle Configuration
 *
 * This file configures Drizzle Kit for schema management and migrations.
 *
 * Project: Neon MCP Server Demo (red-hat-12259541)
 */

export default defineConfig({
  schema: "./schema.js",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "your-neon-connection-string-here",
  },
  verbose: true,
  strict: true,

  // Migration settings
  migrations: {
    table: "drizzle_migrations",
    schema: "public",
  },

  // Schema introspection (optional)
  introspect: {
    casing: "camel",
  },

  // Output settings
  out: "./migrations",

  // Logging
  logger: true,
});

/**
 * Usage:
 *
 * 1. Generate migration from schema changes:
 *    npx drizzle-kit generate
 *
 * 2. Apply migrations to database:
 *    npx drizzle-kit migrate
 *
 * 3. Push schema changes directly (development only):
 *    npx drizzle-kit push
 *
 * 4. Introspect existing database:
 *    npx drizzle-kit introspect
 *
 * 5. Drop all tables (development only):
 *    npx drizzle-kit drop
 */
