const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// In-memory storage for banana data
let bananaIndex = [
  {
    id: 1,
    country: "Ecuador",
    pricePerKg: 1.2,
    averageRipeness: 7.5,
    currency: "USD",
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    country: "Philippines",
    pricePerKg: 0.85,
    averageRipeness: 6.8,
    currency: "USD",
    lastUpdated: "2024-01-14",
  },
  {
    id: 3,
    country: "Costa Rica",
    pricePerKg: 1.45,
    averageRipeness: 8.2,
    currency: "USD",
    lastUpdated: "2024-01-13",
  },
  {
    id: 4,
    country: "India",
    pricePerKg: 0.65,
    averageRipeness: 6.5,
    currency: "USD",
    lastUpdated: "2024-01-12",
  },
  {
    id: 5,
    country: "Brazil",
    pricePerKg: 1.1,
    averageRipeness: 7.8,
    currency: "USD",
    lastUpdated: "2024-01-11",
  },
];

let nextId = 6;

// API Routes
app.get("/api/bananas", (req, res) => {
  res.json(bananaIndex);
});

app.post("/api/bananas", (req, res) => {
  const { country, pricePerKg, averageRipeness, currency = "USD" } = req.body;

  if (!country || !pricePerKg || !averageRipeness) {
    return res.status(400).json({
      error: "Country, price per kg, and average ripeness are required",
    });
  }

  const newBanana = {
    id: nextId++,
    country,
    pricePerKg: parseFloat(pricePerKg),
    averageRipeness: parseFloat(averageRipeness),
    currency,
    lastUpdated: new Date().toISOString().split("T")[0],
  };

  bananaIndex.push(newBanana);
  res.status(201).json(newBanana);
});

app.get("/api/bananas/:id", (req, res) => {
  const banana = bananaIndex.find((b) => b.id === parseInt(req.params.id));
  if (!banana) {
    return res.status(404).json({ error: "Banana not found" });
  }
  res.json(banana);
});

app.put("/api/bananas/:id", (req, res) => {
  const { country, pricePerKg, averageRipeness, currency } = req.body;
  const bananaIndex = bananaIndex.findIndex(
    (b) => b.id === parseInt(req.params.id)
  );

  if (bananaIndex === -1) {
    return res.status(404).json({ error: "Banana not found" });
  }

  bananaIndex[bananaIndex] = {
    ...bananaIndex[bananaIndex],
    ...(country && { country }),
    ...(pricePerKg && { pricePerKg: parseFloat(pricePerKg) }),
    ...(averageRipeness && { averageRipeness: parseFloat(averageRipeness) }),
    ...(currency && { currency }),
    lastUpdated: new Date().toISOString().split("T")[0],
  };

  res.json(bananaIndex[bananaIndex]);
});

app.delete("/api/bananas/:id", (req, res) => {
  const index = bananaIndex.findIndex((b) => b.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Banana not found" });
  }

  const deletedBanana = bananaIndex.splice(index, 1)[0];
  res.json(deletedBanana);
});

// Serve the main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🍌 Banana Index server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api/bananas`);
});
