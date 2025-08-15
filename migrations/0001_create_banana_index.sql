-- Migration: Create banana_index table if it does not exist

CREATE TABLE IF NOT EXISTS "banana_index" (
	"id" serial PRIMARY KEY NOT NULL,
	"country" varchar(100) NOT NULL,
	"price_per_kg" decimal(10,2) NOT NULL,
	"average_ripeness" decimal(3,1) NOT NULL,
	"currency" varchar(3) DEFAULT 'USD',
	"last_updated" date DEFAULT CURRENT_DATE,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO "banana_index" ("country", "price_per_kg", "average_ripeness", "currency", "last_updated") VALUES
	('Ecuador', 1.20, 7.5, 'USD', '2024-01-15'),
	('Philippines', 0.85, 6.8, 'USD', '2024-01-14'),
	('Costa Rica', 1.45, 8.2, 'USD', '2024-01-13'),
	('India', 0.65, 6.5, 'USD', '2024-01-12'),
	('Brazil', 1.10, 7.8, 'USD', '2024-01-11')
ON CONFLICT DO NOTHING;
