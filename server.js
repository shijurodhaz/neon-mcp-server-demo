import express from "express";
import cors from "cors";
import path from "path";
import { db, bananaIndex } from "./db.js";
import { eq } from "drizzle-orm";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// API Routes
app.get("/api/bananas", async (req, res) => {
  try {
    const bananas = await db.select().from(bananaIndex);
    res.json(bananas);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/api/bananas", async (req, res) => {
  const { country, pricePerKg, averageRipeness, currency = "USD" } = req.body;

  if (!country || !pricePerKg || !averageRipeness) {
    return res.status(400).json({
      error: "Country, price per kg, and average ripeness are required",
    });
  }

  try {
    const newBanana = await db
      .insert(bananaIndex)
      .values({
        country,
        pricePerKg: parseFloat(pricePerKg),
        averageRipeness: parseFloat(averageRipeness),
        currency,
        lastUpdated: new Date().toISOString().split("T")[0],
      })
      .returning();

    res.status(201).json(newBanana[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to add banana to database" });
  }
});

app.get("/api/bananas/:id", async (req, res) => {
  try {
    const bananas = await db
      .select()
      .from(bananaIndex)
      .where(eq(bananaIndex.id, parseInt(req.params.id)));

    if (bananas.length === 0) {
      return res.status(404).json({ error: "Banana not found" });
    }
    res.json(bananas[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.put("/api/bananas/:id", async (req, res) => {
  const { country, pricePerKg, averageRipeness, currency } = req.body;

  try {
    const updateData = {};
    if (country) updateData.country = country;
    if (pricePerKg) updateData.pricePerKg = parseFloat(pricePerKg);
    if (averageRipeness)
      updateData.averageRipeness = parseFloat(averageRipeness);
    if (currency) updateData.currency = currency;
    updateData.lastUpdated = new Date().toISOString().split("T")[0];

    const updatedBananas = await db
      .update(bananaIndex)
      .set(updateData)
      .where(eq(bananaIndex.id, parseInt(req.params.id)))
      .returning();

    if (updatedBananas.length === 0) {
      return res.status(404).json({ error: "Banana not found" });
    }

    res.json(updatedBananas[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/api/bananas/:id", async (req, res) => {
  try {
    const deletedBananas = await db
      .delete(bananaIndex)
      .where(eq(bananaIndex.id, parseInt(req.params.id)))
      .returning();

    if (deletedBananas.length === 0) {
      return res.status(404).json({ error: "Banana not found" });
    }

    res.json(deletedBananas[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

// Serve the main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, async () => {
  console.log(`🍌 Banana Index server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api/bananas`);

  // Test database connection on startup
  try {
    const result = await db.select().from(bananaIndex).limit(1);
    console.log(`✅ Connected to Neon database`);
  } catch (error) {
    console.error(`❌ Database connection failed:`, error.message);
  }
});
