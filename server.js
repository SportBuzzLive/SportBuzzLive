const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.CRICKET_API_KEY;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/current-matches", async (req, res) => {
  if (!API_KEY) return res.status(500).json({ error: "CRICKET_API_KEY is not configured on the server." });

  try {
    const url = `https://api.cricapi.com/v1/currentMatches?apikey=${encodeURIComponent(API_KEY)}&offset=0`;
    const response = await fetch(url);
    const data = await response.json();
    res.status(response.ok ? 200 : response.status).json(data);
  } catch (err) {
    res.status(502).json({ error: "Unable to reach CricketData API.", detail: err.message });
  }
});

app.listen(PORT, () => console.log(`SportBuzzLive running on port ${PORT}`));
