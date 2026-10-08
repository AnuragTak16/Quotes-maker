#!/usr/bin/env bash
# Uploads GROQ_API_KEY from .env.local to Cloudflare Workers secrets.
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ ! -f .env.local ]]; then
  echo "Missing .env.local — add GROQ_API_KEY=gsk_... first."
  exit 1
fi

KEY="$(grep -E '^GROQ_API_KEY=' .env.local | cut -d= -f2- | tr -d '\r' | xargs)"
if [[ -z "$KEY" ]]; then
  echo "GROQ_API_KEY is empty in .env.local"
  exit 1
fi

echo "Logging in (browser) if needed…"
npx wrangler login

echo "Uploading GROQ_API_KEY secret to Worker…"
printf '%s' "$KEY" | npx wrangler secret put GROQ_API_KEY

echo "Done. Redeploy so the secret is live:"
echo "  npm run deploy"
