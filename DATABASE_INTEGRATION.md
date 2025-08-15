# 🍌 Database Integration Guide

This guide explains how to integrate your Banana Index application with Neon's MCP Server using Drizzle ORM.

## 📋 Files Created

### 1. `schema.js` - Drizzle Schema

- Defines the `bananaIndex` table structure
- Includes TypeScript types for type safety
- Contains validation constraints (ripeness 1-10)
- Provides example usage patterns

### 2. `db.js` - Database Configuration

- Sets up Neon database connection
- Exports Drizzle database instance
- Includes connection testing function
- Contains setup instructions

### 3. `drizzle.config.js` - Drizzle Configuration

- Configures Drizzle Kit for migrations
- Sets up schema introspection
- Defines migration settings

### 4. `migrations/0001_create_banana_index.sql` - Migration File

- SQL migration for creating the table
- Includes sample data insertion
- Can be run manually or via Drizzle Kit

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Your Neon Connection String

1. Go to [Neon Console](https://console.neon.tech)
2. Select your project: **"Neon MCP Server Demo"**
3. Go to **Connection Details**
4. Copy the connection string
5. Set it as an environment variable:

```bash
export DATABASE_URL="postgresql://username:password@hostname/database?sslmode=require"
```

### 3. Test Database Connection

```bash
node -e "import('./db.js').then(({testConnection}) => testConnection())"
```

### 4. Run Migrations (Optional)

Since the table already exists in your Neon database, you can skip this step. If you want to use Drizzle migrations:

```bash
npm run db:migrate
```

## 🛠️ Available Commands

```bash
# Generate migration from schema changes
npm run db:generate

# Apply migrations to database
npm run db:migrate

# Push schema changes directly (development)
npm run db:push

# Introspect existing database
npm run db:introspect

# Open Drizzle Studio (database GUI)
npm run db:studio
```

## 📊 Database Schema

| Column             | Type            | Constraints               | Description          |
| ------------------ | --------------- | ------------------------- | -------------------- |
| `id`               | `serial`        | PRIMARY KEY               | Auto-incrementing ID |
| `country`          | `varchar(100)`  | NOT NULL                  | Country name         |
| `price_per_kg`     | `decimal(10,2)` | NOT NULL                  | Price per kilogram   |
| `average_ripeness` | `decimal(3,1)`  | NOT NULL, CHECK (1-10)    | Ripeness scale       |
| `currency`         | `varchar(3)`    | DEFAULT 'USD'             | Currency code        |
| `last_updated`     | `date`          | DEFAULT CURRENT_DATE      | Last update date     |
| `created_at`       | `timestamp`     | DEFAULT CURRENT_TIMESTAMP | Creation timestamp   |

## 🔍 Query Examples

```javascript
// Get all bananas
const allBananas = await db.select().from(bananaIndex);

// Get bananas by country
const ecuadorBananas = await db
  .select()
  .from(bananaIndex)
  .where(eq(bananaIndex.country, "Ecuador"));

// Get average price
const avgPrice = await db
  .select({ avg: avg(bananaIndex.pricePerKg) })
  .from(bananaIndex);

// Insert new banana
const newBanana = await db
  .insert(bananaIndex)
  .values({
    country: "Japan",
    pricePerKg: "2.50",
    averageRipeness: "8.5",
    currency: "USD",
  })
  .returning();

// Update banana
const updatedBanana = await db
  .update(bananaIndex)
  .set({ pricePerKg: "1.30" })
  .where(eq(bananaIndex.id, 1))
  .returning();

// Delete banana
await db.delete(bananaIndex).where(eq(bananaIndex.id, 1));
```

## 📚 Resources

- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Neon Documentation](https://neon.tech/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Drizzle Kit Commands](https://orm.drizzle.team/kit-docs/commands)
