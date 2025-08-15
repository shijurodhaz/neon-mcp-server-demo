import {
  pgTable,
  serial,
  varchar,
  decimal,
  date,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * Banana Index Table Schema
 *
 * This schema represents the banana_index table in our Neon database.
 * It tracks banana prices and ripeness levels across different countries.
 *
 * Generated from Neon database table: banana_index
 * Project: Neon MCP Server Demo
 */
export const bananaIndex = pgTable("banana_index", {
  // Primary key - auto-incrementing integer
  id: serial("id").primaryKey(),

  // Country name (required)
  country: varchar("country", { length: 100 }).notNull(),

  // Price per kilogram in USD (required)
  pricePerKg: decimal("price_per_kg", { precision: 10, scale: 2 }).notNull(),

  // Average ripeness on a scale of 1-10 (required)
  averageRipeness: decimal("average_ripeness", {
    precision: 3,
    scale: 1,
  }).notNull(),

  // Currency code (optional, defaults to USD)
  currency: varchar("currency", { length: 3 }).default("USD"),

  // Last updated date (optional, defaults to current date)
  lastUpdated: date("last_updated").default("CURRENT_DATE"),

  // Created timestamp (optional, defaults to current timestamp)
  createdAt: timestamp("created_at").default("CURRENT_TIMESTAMP"),
});
