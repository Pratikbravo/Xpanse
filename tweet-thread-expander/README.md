# AI Tweet Thread Expander

Paste a topic → get a numbered thread (<260 chars each), ready to post.

## Run locally
1. `npm i`
2. Copy `.env.local.example` to `.env.local` and set `OPENAI_API_KEY`.
3. `npm run dev` then open http://localhost:3000

## Deploy
- Push to GitHub → Import on Vercel
- Add env var `OPENAI_API_KEY`
- Optional: set `RATE_LIMIT_REQUESTS` and `RATE_LIMIT_WINDOW_MS`

## Notes
- In-memory rate limiting is best-effort only on serverless. For production use Upstash/Redis.
- Always review outputs for accuracy before posting.