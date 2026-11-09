# AgentPay — Autonomous AI Agent Commerce & Settlement Protocol

> **"Let AI Agents Do Business."**
> A cinematic fintech web application and multi-agent commerce platform where autonomous AI agents collaborate to complete real software tasks, negotiate budgets, and execute user-approved payments through PayPal Sandbox.

---

## 🌟 What's New: Genuine AI Agent Collaboration

AgentPay includes a **real backend orchestration and policy engine** that coordinates specialized AI agents with deterministic spending caps and live deliverable generation:

1. **Research Agent**: Analyzes the user's objective, identifies API specifications, evaluates risks, benchmarks architectures, and submits a proposed fee.
2. **Design Agent**: Ingests the research deliverable, formulates visual design tokens, component hierarchies, and layout blueprints, and submits a proposed fee.
3. **Coding Agent**: Ingests research and design deliverables, produces complete source code (`index.html`, `App.tsx`, `styles.css`), and compiles an **interactive live sandboxed preview** executable inside an iframe.
4. **Deterministic Trust & Budget Policy Engine**:
   - Rejects any proposal exceeding remaining budget.
   - Enforces per-agent spending limits.
   - Cryptographically hashes deliverables with SHA-256.
   - Prohibits settlement without explicit human approval.
   - Intercepts replay attacks & duplicate payments using unique nonce validation.
   - Maintains an immutable, tamper-evident audit ledger.
5. **PayPal Sandbox Settlement**:
   - Transfers verified agent disbursements through PayPal Sandbox REST API v2.
   - Generates downloadable cryptographically signed JSON receipts.

---

## 🛠️ Architecture

```
User Mission & Budget Cap ($800)
              │
              ▼
   ┌──────────────────────┐
   │ AI Task Orchestrator │ ── Decomposes into DAG subtasks
   └──────────────────────┘
              │
              ├──► Research Agent ──► Trust Policy Gate ──► SHA-256 Checksum ($150)
              │
              ├──► Design Agent   ──► Trust Policy Gate ──► SHA-256 Checksum ($246)
              │
              └──► Coding Agent   ──► Trust Policy Gate ──► Live Sandbox ($310)
                                                                 │
                                                    Total: $706 ($94 Surplus)
                                                                 │
                                                                 ▼
                                                  Human 1-Tap 2FA Approval
                                                                 │
                                                                 ▼
                                                 PayPal Sandbox Settlement
                                                (Replay-Protected Nonce)
```

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js v18+ (tested on Node v20/v26)
- npm v9+

### 2. Installation

```bash
git clone https://github.com/your-username/AgentPay.git
cd AgentPay
npm install
```

### 3. AI Provider Configuration (Optional for Live LLM Mode)

AgentPay features a built-in cognitive synthesizer that works out of the box. To connect live LLMs (Google Gemini or OpenAI):

Create a `.env` file in the root directory:
```env
# Choose Gemini (Free Tier) or OpenAI:
GEMINI_API_KEY=AIzaSy...
# or
OPENAI_API_KEY=sk-...
```

*Note: You can also configure the API key directly in the web UI via the "Configure API Key" drawer. Keys are saved securely to `.env` on the server and are **never exposed** in the client bundle.*

### 4. PayPal Sandbox Configuration (Required for Live Settlement)

Create a `.env` file in the root directory with your PayPal Sandbox credentials:

```env
PAYPAL_CLIENT_ID=your_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_sandbox_client_secret
PAYPAL_ENVIRONMENT=sandbox
APP_URL=http://localhost:5173
```

**How to get PayPal Sandbox credentials:**
1. Go to the [PayPal Developer Dashboard](https://developer.paypal.com)
2. Create a Sandbox account
3. Create a Sandbox app in "Sandbox" mode
4. Copy the Client ID and Client Secret

**These secrets are never exposed to the frontend.** The `/api/paypal/credentials` endpoint returns only a masked status object.

### 5. Supabase Configuration (Optional for Persistent Storage)

For production deployment, set these to persist transactions to PostgreSQL instead of the in-memory store:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
```

Without these, the app falls back to an in-memory store that resets on server restart.

### 6. Running the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

- **Frontend**: Vite + React 18 + Tailwind CSS + Three.js + GSAP ScrollTrigger + Lenis
- **Backend API**: Integrated Vite Node middleware handling `/api/*` endpoints.

### 7. Running Tests

```bash
npm run test          # Run all tests once
npm run test:watch    # Watch mode
npm run typecheck     # TypeScript type check
npm run build         # Production build
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/status` | Returns server health, active AI provider, and policy engine status. |
| `POST` | `/api/config` | Securely binds an API key to the server `.env`. |
| `POST` | `/api/orchestrate` | Executes task decomposition, agent execution, and deliverable verification. |
| `POST` | `/api/approve-and-pay` | Validates human authorization, checks nonces, and settles via PayPal Sandbox REST API v2. |
| `GET` | `/api/paypal/credentials` | Returns **masked** PayPal configuration status (never exposes secrets). |
| `GET` | `/api/transactions` | Returns persisted transaction history with cryptographic signatures. |
| `GET` | `/api/audit-logs` | Retrieves the immutable audit ledger with cryptographic SHA-256 signatures. |
| `GET` | `/api/last-result` | Fetches the most recent orchestration result. |

---

## 🧪 Testing the Workflow

You can test the entire workflow end-to-end directly in the UI or via curl:

```bash
# 1. Orchestrate a mission:
curl -X POST http://localhost:5173/api/orchestrate \
  -H "Content-Type: application/json" \
  -d '{"task": "Build an autonomous AI portfolio rebalancing dashboard", "budget": 800}'

# 2. Authorize human payment with nonce:
curl -X POST http://localhost:5173/api/approve-and-pay \
  -H "Content-Type: application/json" \
  -d '{"userConfirmed": true, "paymentNonce": "NONCE-101", "orderId": "ORDER-101"}'

# 3. Verify duplicate payment protection (should return HTTP 403):
curl -X POST http://localhost:5173/api/approve-and-pay \
  -H "Content-Type: application/json" \
  -d '{"userConfirmed": true, "paymentNonce": "NONCE-101", "orderId": "ORDER-101"}'
```

---

## 🔒 Security & Sandbox Disclaimer

- **No Real-Money Charges**: All financial settlements target the simulated PayPal Sandbox API.
- **Server-Side Key Isolation**: All LLM API keys remain strictly in server memory and `.env`.
- **Zero Overrun Guarantee**: Hard spending ceilings are enforced deterministically by code, not by LLM prompts.
- **Human Sovereignty**: Funds can never be disbursed without explicit user confirmation.
- **No Secrets in Frontend**: PayPal credentials are never bundled into the client. The `/api/paypal/credentials` endpoint returns only a masked status object.

---

## 🧪 Testing

```bash
npm run test          # Run all tests once (33 tests across 4 files)
npm run typecheck     # TypeScript type check
npm run build         # Production build
```

Test coverage includes:
- **`tests/trustEngine.test.ts`** (14 tests): budget enforcement, per-agent caps, SHA-256 verification, human approval, replay protection, audit log signatures
- **`tests/transactionRepo.test.ts`** (10 tests): save/find/update/list, duplicate-order isolation, signature determinism
- **`tests/paypalService.test.ts`** (6 tests): order creation via REST v2, capture success/failure, credential masking, webhook signature validation
- **`tests/settlementWorkflow.test.ts`** (4 tests): full orchestration → settlement → persistence workflow

---

## 🚢 Deployment

### Build Output
```bash
npm run build
# Output: ./dist/ (single-page app, SPA)
```

### SPA Routing
The app is a single-page application. Configure your hosting platform to serve `index.html` for all routes (including `/payment/success` and `/payment/cancel`).

### Required Environment Variables (Server)
| Variable | Required | Purpose |
|---|---|---|
| `PAYPAL_CLIENT_ID` | Yes (for live settlement) | PayPal Sandbox app client ID |
| `PAYPAL_CLIENT_SECRET` | Yes (for live settlement) | PayPal Sandbox app client secret |
| `PAYPAL_ENVIRONMENT` | No | `sandbox` (default) or `live` |
| `APP_URL` | No | Base URL for PayPal return/cancel callbacks |
| `SUPABASE_URL` | No | Supabase project URL for persistent storage |
| `SUPABASE_ANON_KEY` | No | Supabase anonymous key for persistent storage |
| `GEMINI_API_KEY` | No | Google Gemini API key (LLM mode) |
| `OPENAI_API_KEY` | No | OpenAI API key (LLM mode) |

### Hosting Platforms
- **Vercel**: Deploy the `dist/` folder with SPA fallback enabled
- **Netlify**: Deploy the `dist/` folder with SPA fallback enabled
- **Railway/Render**: Run the Vite dev server or build + serve `dist/`

> **Note**: The PayPal API calls require a server-side runtime. On serverless hosts, ensure the `/api/*` routes are handled by a Node.js function or container.
