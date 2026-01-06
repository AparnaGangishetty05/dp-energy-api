import express from "express";

const app = express();
app.use(express.json());

// ---------- Home route ----------
app.get("/", (req, res) => {
  res.send("Minimum Energy API is running");
});

// ---------- GET route (shows minimum energy = 15) ----------
app.get("/min-energy", (req, res) => {
  const cost = [10, 15, 20];

  const n = cost.length;
  const dp = new Array(n);

  dp[0] = cost[0];
  dp[1] = cost[1];

  for (let i = 2; i < n; i++) {
    dp[i] = cost[i] + Math.min(dp[i - 1], dp[i - 2]);
  }

  const result = Math.min(dp[n - 1], dp[n - 2]);

  // 👇 Plain text output
  res.send(`Minimum energy is ${result}`);
});

// ---------- POST route (JSON input) ----------
app.post("/min-energy", (req, res) => {
  const cost = req.body.cost;

  if (!cost || cost.length < 2) {
    return res.status(400).json({
      error: "Please provide a valid cost array",
    });
  }

  const n = cost.length;
  const dp = new Array(n);

  dp[0] = cost[0];
  dp[1] = cost[1];

  for (let i = 2; i < n; i++) {
    dp[i] = cost[i] + Math.min(dp[i - 1], dp[i - 2]);
  }

  const result = Math.min(dp[n - 1], dp[n - 2]);

  res.json({
    minimumEnergy: result,
  });
});

// ---------- PORT (Render compatible) ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
