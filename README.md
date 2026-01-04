# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

---

## Authentication (Sign in / Sign up)

This project includes simple Sign in / Sign up pages and a Google Sign-In button.

Quick notes to get started:

- The frontend calls the MERN backend endpoints at `/auth/login` and `/auth/register`. Ensure your backend implements these routes and returns an auth token (e.g., `{ token: string }`).
- Google Sign-In uses the Google Identity Services client and sends the returned id_token to the backend at `/auth/google` (POST `{ idToken }`). The backend should verify the id token and return a project auth token.
- To enable Google Sign-In add your client id to an environment variable named `VITE_GOOGLE_CLIENT_ID` (e.g., in `.env`):

```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
VITE_MERN_API_URL=http://localhost:5000/api
```

- After updating `.env`, restart the dev server (`npm run dev`).

---

### How to create a Web OAuth client in Google Cloud Console (step-by-step)

1. Go to Google Cloud Console → APIs & Services → Credentials.
2. Click **Create Credentials → OAuth client ID**.
3. For **Application type** choose **Web application** (this is required for the client_id to work with the GSI button).
4. Set a name (e.g., "MaestroLink - Dev").
5. Under **Authorized JavaScript origins** add the origin(s) you'll be testing from, e.g.:
   - `http://localhost:5173` (Vite default)
   - `http://localhost:3000` (if you use a different port)
6. Leave **Authorized redirect URIs** empty for Google Identity Services (GSI) button flows — you don't need redirect URIs unless you use the older OAuth redirect flows.
7. Click **Create** and copy the **Client ID** (format: `XXXXXXXXXXX-xxxxxxxxxxxxxxxx.apps.googleusercontent.com`).
8. Paste that into your `.env` as `VITE_GOOGLE_CLIENT_ID` and restart your dev server.

If you see an **invalid_client / OAuth client was not found** error in the Google sign-in dialog, verify the client is a **Web application** and that the exact client id (no extra spaces or quotes) is configured and the origin is included in Authorized JavaScript origins.

If you'd like, I can also add a small script to log the client id used in the browser console (helpful to confirm the running app is using the value you expect). I already added debug logs to `src/components/auth/GoogleSignInButton.tsx` — check your browser console for `GOOGLE_CLIENT_ID (runtime)` when the app loads.

If you'd like, I already created a minimal Express + Mongoose auth microservice scaffold at `./server` that you can run locally. It supports:

- `POST /auth/register` (name, email, password) → returns `{ token }`
- `POST /auth/login` (email, password) → returns `{ token }`
- `POST /auth/google` (idToken) → verifies Google id_token server-side and returns `{ token }`

How to run it locally:

1. cd server
2. npm i
3. Copy `.env.example` to `.env` and fill `MONGO_URI`, `JWT_SECRET`, and `GOOGLE_CLIENT_ID`.
4. npm run dev (server runs on port 4000 by default)

The backend uses `google-auth-library` to verify id_tokens and issues a JWT signed by `JWT_SECRET`. If you'd like, I can wire the frontend to call the local server and persist tokens in httpOnly cookies instead of `localStorage`.
