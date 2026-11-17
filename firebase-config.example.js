// firebase-config.example.js
//
// This is a TEMPLATE - safe to commit to git. It contains no real secrets.
//
// For LOCAL TESTING:
//   1. Copy this file to "firebase-config.js" (same folder as index.html / supervisor.html).
//   2. Fill in your real Firebase project values below (Firebase Console ->
//      Project Settings -> General -> Your apps -> SDK setup and config).
//   3. firebase-config.js is listed in .gitignore, so it will never be committed.
//
// For PRODUCTION (GitHub Pages deploy):
//   This file is NOT used. The real firebase-config.js is generated automatically
//   by the GitHub Actions workflow (.github/workflows/deploy.yml) from repository
//   secrets at deploy time. See that workflow file and README-SETUP.md for the
//   list of secret names to add under Settings -> Secrets and variables -> Actions.

window.FIREBASE_CONFIG = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Password required to open the Supervisor Portal (supervisor.html).
// Change this to something only supervisors know.
window.SUPERVISOR_PASSWORD = "changeme";
