# AgentPay Deployment Security Checklist

## Pre-Deployment Verification

### 1. Environment Variables
- [ ] `.env` file is NOT committed to version control
- [ ] `.env.example` contains only safe placeholder values
- [ ] `PAYPAL_ENVIRONMENT=sandbox` (never deploy with `live` initially)
- [ ] `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` are set
- [ ] `SESSION_SECRET` is at least 32 characters and randomly generated
- [ ] `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set (if using Supabase)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set server-side only (never in frontend)
- [ ] `GEMINI_API_KEY` or `OPENAI_API_KEY` are set (if using live AI)

### 2. Secrets Management
- [ ] No secrets prefixed with `VITE_` in the codebase
- [ ] All PayPal credentials are server-side only
- [ ] All AI API keys are server-side only
- [ ] Supabase service-role key is never exposed to frontend
- [ ] `.env` is in `.gitignore`
- [ ] No hardcoded secrets in source code

### 3. Build Verification
- [ ] `npm run build` succeeds
- [ ] Frontend bundle contains no secrets
- [ ] `dist/` directory is the build output
- [ ] SPA routing is configured (all routes serve `index.html`)

### 4. Security Headers
- [ ] `X-Content-Type-Options: nosniff` is set
- [ ] `X-Frame-Options: DENY` is set
- [ ] `X-XSS-Protection: 1; mode=block` is set
- [ ] `Strict-Transport-Security` is set for production
- [ ] `Referrer-Policy: strict-origin-when-cross-origin` is set
- [ ] `Cache-Control: no-store` is set on API responses

### 5. CORS Configuration
- [ ] CORS origins are explicitly allowed (not wildcard in production)
- [ ] Preflight OPTIONS requests are handled correctly

### 6. Authentication
- [ ] Session tokens are cryptographically signed (HMAC)
- [ ] Session tokens have expiration
- [ ] Guest sessions are time-limited (24 hours)
- [ ] Authenticated sessions are time-limited (30 days)
- [ ] Passwords are hashed with PBKDF2 (100,000 iterations)
- [ ] Password minimum length is enforced (6 characters)
- [ ] Email validation is enforced

### 7. Rate Limiting
- [ ] Auth endpoints are rate-limited (login, signup)
- [ ] Payment endpoints are rate-limited
- [ ] AI orchestration endpoints are rate-limited
- [ ] Rate limit window is 60 seconds
- [ ] Max requests per window is 30

### 8. Input Validation
- [ ] All API inputs are validated with Zod schemas
- [ ] Request body size is limited (2MB max)
- [ ] Task descriptions are length-limited (2000 chars max)
- [ ] Budgets are validated as positive finite numbers
- [ ] Email addresses are validated
- [ ] Passwords are length-checked

### 9. PayPal Security
- [ ] PayPal is in Sandbox mode
- [ ] PayPal credentials are server-side only
- [ ] Payment amounts are calculated on the backend
- [ ] Duplicate payment prevention is active
- [ ] Webhook signatures are verified
- [ ] Capture status is verified before marking as successful

### 10. AI Agent Security
- [ ] User task descriptions are treated as untrusted input
- [ ] Agents cannot access environment variables
- [ ] Agents cannot execute shell commands
- [ ] Agents cannot access the filesystem
- [ ] Budget limits are enforced server-side
- [ ] Human approval is required for payments

### 11. Database Security
- [ ] Row Level Security (RLS) is enabled on user-specific tables
- [ ] Users can only access their own records
- [ ] Service-role key is server-side only
- [ ] All database writes are validated

### 12. Logging
- [ ] No API keys are logged
- [ ] No passwords are logged
- [ ] No tokens are logged
- [ ] No secrets are logged
- [ ] Security events are logged
- [ ] Error messages don't expose stack traces in production

## Deployment Steps

1. **Configure environment variables** (see `.env.example`)
2. **Run tests**: `npm run test`
3. **Build**: `npm run build`
4. **Deploy `dist/`** to your hosting platform
5. **Configure SPA routing** to serve `index.html` for all routes
6. **Set up SSL/TLS** (HTTPS required for production)
7. **Configure CORS** for your production domain
8. **Enable rate limiting** in your infrastructure
9. **Set up monitoring** for security events
10. **Rotate secrets** regularly

## Required Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `PAYPAL_CLIENT_ID` | Yes | PayPal REST API Client ID |
| `PAYPAL_CLIENT_SECRET` | Yes | PayPal REST API Client Secret |
| `PAYPAL_ENVIRONMENT` | No | `sandbox` or `live` (default: `sandbox`) |
| `APP_URL` | No | Application base URL |
| `SESSION_SECRET` | No | HMAC session signing secret (auto-generated if not set) |
| `SUPABASE_URL` | No | Supabase project URL |
| `SUPABASE_ANON_KEY` | No | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Supabase service-role key (server-side only) |
| `GEMINI_API_KEY` | No | Google Gemini API key |
| `OPENAI_API_KEY` | No | OpenAI API key |
| `PORT` | No | Server port (default: 3001) |
| `NODE_ENV` | No | `development` or `production` |
| `DEBUG` | No | Enable debug logging |
## Netlify + Render deployment (required for the current backend)

The Vite middleware in `vite.config.ts` is development-only. It does not deploy the Node API to Netlify. Deploy the frontend to Netlify and the persistent Node API to Render:

1. Push this project to GitHub.
2. In Render, create a **Blueprint** from this repository and approve the `render.yaml` service named `agentpay-api`.
3. Wait for the Render service to become Live. Its URL should be `https://agentpay-api.onrender.com` (if Render assigns a different URL, update the `/api/*` target in `netlify.toml` to that exact URL and redeploy Netlify).
4. In Netlify, connect the same repository. Set build command to `npm run build` and publish directory to `dist`. The included `netlify.toml` already contains these settings and the API proxy.
5. Redeploy the Netlify site. The `/api/*` proxy rule must remain above the SPA fallback rule.
6. Optional integrations: add `GEMINI_API_KEY` or `OPENAI_API_KEY` to Render environment variables. For PayPal Sandbox payments, add `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` to Render only, and keep `PAYPAL_ENVIRONMENT=sandbox`. Never add server secrets to Netlify frontend variables or `VITE_` variables.
7. Verify `https://agentpay-api.onrender.com/api/status` returns JSON, then test guest login on the Netlify site.

The API currently keeps demo users and sessions in process memory. Use a single Render instance for this demo; a process restart clears sessions. For production/multi-instance use, move auth/session storage to a persistent shared database/store before scaling.
