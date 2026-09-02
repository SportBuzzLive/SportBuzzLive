# SportBuzzLive

Starter cricket live-score website using CricketData/CricAPI.

## Run locally
1. Install Node.js 18+.
2. Copy `.env.example` to `.env`.
3. Put your NEW CricketData API key in `.env`.
4. Run:
   npm install
   npm start
5. Open http://localhost:3000

## Security
Never put the API key in `public/app.js`, HTML, or client-side JavaScript. Keep it server-side in `.env`/hosting environment variables.

## Next phase
- Match detail + scorecard
- Ball-by-ball commentary
- 1920x1080 OBS scoreboard overlay
- Original Hindi/Hinglish commentary engine
- YouTube Live integration after Google OAuth
