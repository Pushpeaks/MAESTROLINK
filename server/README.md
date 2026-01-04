# MaestroLink - Auth microservice (dev)

This is a minimal Express + Mongoose auth microservice for local development.

Endpoints:

- POST /auth/register
  - body: { name, email, password }
  - returns: { token }

- POST /auth/login
  - body: { email, password }
  - returns: { token }

- POST /auth/google
  - body: { idToken }
  - verifies Google id_token server-side and returns { token }
- `POST /contact`
  - body: { name, email, message, source? }
  - saves contact requests to MongoDB and returns { ok: true, id }
Run locally:

1. cd server
2. npm i
3. Copy `.env.example` to `.env` and fill environment variables
4. npm run dev

Notes:
- This is a simple scaffold; in production you should harden validation, rate-limit auth endpoints, store JWTs in httpOnly cookies, and secure secrets.
