# Verifone Support Rating Tool — Setup Guide

This app is two static pages (`index.html`, `supervisor.html`) backed by a
shared Firebase Firestore database. There is no build step and no server —
it can be hosted anywhere that serves static files, including GitHub Pages.

## What changed in this version

1. **No names are hardcoded in the source anymore.** Agents, Support staff,
   and Team Leads all live only in Firestore. A brand-new Firebase project
   starts with empty rosters — use the Supervisor Portal's "+ Add" buttons,
   or the new **"📥 Import Agents from Excel"** button to bulk-load your
   agent list.
2. **The Firebase API key and the supervisor password are no longer
   hardcoded in the HTML.** Both files now load `firebase-config.js` at
   runtime, which is excluded from git via `.gitignore`.
3. **Excel import for Agents.** In the Supervisor Portal → Agents tab,
   click "📥 Import Agents from Excel" and upload a spreadsheet with
   columns `Agent Name` and `Supervisor` (matches your
   `Agent_List_w_Supervisor.xlsx` format). You'll see a preview of what
   will change before anything is saved — new agents, supervisor updates,
   and any brand-new Team Lead names that need to be created.

## Local testing

1. `firebase-config.js` already exists in this folder with your existing
   Firebase project values, so you can open `index.html` / `supervisor.html`
   directly (via a local server — Firestore's SDK needs http(s), not
   `file://`) and it will work immediately.
2. **Do not commit `firebase-config.js`.** It's already in `.gitignore`.
   If you ever need to recreate it, copy `firebase-config.example.js` to
   `firebase-config.js` and fill in the real values.

A quick local server, from this folder:
```
python3 -m http.server 8080
```
Then open `http://localhost:8080/index.html` and
`http://localhost:8080/supervisor.html`.

## Deploying with GitHub Pages + GitHub Secrets

1. Push this folder to a GitHub repository (firebase-config.js will be
   skipped automatically thanks to `.gitignore`).
2. In the repo, go to **Settings → Secrets and variables → Actions → New
   repository secret** and add each of these (values from Firebase Console
   → Project Settings → General → Your apps → SDK setup and config):
   - `FIREBASE_API_KEY`
   - `FIREBASE_AUTH_DOMAIN`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_STORAGE_BUCKET`
   - `FIREBASE_MESSAGING_SENDER_ID`
   - `FIREBASE_APP_ID`
   - `SUPERVISOR_PASSWORD` (pick a new password — don't reuse the old one)
3. Go to **Settings → Pages** and set the source to **GitHub Actions**.
4. Push to `main` (or run the workflow manually from the Actions tab). The
   included workflow at `.github/workflows/deploy.yml` will generate a
   fresh `firebase-config.js` from those secrets at deploy time and publish
   the site.

## A note on "secrets" and Firebase web apps

Firebase's web `apiKey` is not a traditional secret — it's visible in any
browser's network tab once the page loads, by design (Firebase docs confirm
this). Moving it out of the HTML source and into GitHub Secrets is still
good practice (keeps it out of git history, makes rotation easy, keeps
config environment-specific), but the *real* access control for your data
is:

1. **Firestore Security Rules** — lock down who can read/write each
   collection (e.g., restrict `feedback` writes to validated shapes, restrict
   roster writes to the supervisor flow only).
2. **Firebase App Check** (optional, stronger) — blocks requests that don't
   come from your actual deployed app.

If you haven't set custom Firestore Security Rules yet (the project may
still be in Firestore's default "test mode"), that's the next thing worth
tightening — happy to help draft rules for this specific data shape if you
want.

## Agent import spreadsheet format

The importer looks for a header row with columns named (case-insensitive,
partial match is fine):
- `Agent Name` (required)
- `Supervisor` (optional — also matches "Team Lead" or "TL")
- `Location` (optional — also matches "Site"; if omitted, the importer
  infers it from the agent's existing record, or from the matching
  Team Lead's site, or asks you to pick one per new agent in the preview)

Your existing `Agent_List_w_Supervisor.xlsx` (columns: `Agent Name`,
`Supervisor`) works as-is.
