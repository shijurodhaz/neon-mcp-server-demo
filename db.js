import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { bananaIndex } from "./schema.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

/**
 * Database Configuration for Neon
 *
 * This file sets up the connection to our Neon database using Drizzle ORM.
 *
 * Project: Neon MCP Server Demo
 */

// Get the database URL from environment variables
const databaseUrl =
  process.env.DATABASE_URL || "your-neon-connection-string-here";

// Create the Neon client
const sql = neon(databaseUrl);

// Create the Drizzle database instance
export const db = drizzle(sql);

// Export the schema for use in other files
export { bananaIndex };

/**
 * Database connection test function
 */
export async function testConnection() {
  try {
    const result = await sql`SELECT version()`;
    console.log("✅ Database connection successful");
    console.log("PostgreSQL version:", result[0].version);
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return false;
  }
}
