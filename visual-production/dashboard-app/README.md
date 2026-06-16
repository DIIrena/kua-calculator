# Visual Production Dashboard (local-only)

A private control panel for the H1 image and video production batch. It reads the H1
manifest, shows the 9 assets, and lets you set local status, selected output, and owner
notes, saving back to `manifests/manifest.json` and regenerating the markdown sheets.

> Drafts are not public. Approved assets still need a separate wiring step.

## Stack

Zero dependencies. A single Node built-in HTTP server (`server.js`) plus a static
vanilla-JS front end in `web/`. No build step, no `node_modules`, no framework. Node is
already present for the main site, so nothing needs installing.

## Run

From this folder:

```
node server.js
```

Then open http://127.0.0.1:4317 in a browser. Stop with Ctrl+C.

Change the port with `VP_DASHBOARD_PORT` if 4317 is busy:

```
VP_DASHBOARD_PORT=4500 node server.js
```

`npm start` is an alias for `node server.js`. `npm run regen` (or `node server.js --regen`)
just normalizes the manifest and regenerates the markdown, without starting the server.

## What it can and cannot do

- It binds to `127.0.0.1` only. It is never exposed on the network and is never deployed.
- It reads files only inside `visual-production/` (prompts, contact sheets, drafts, manifest).
- It writes only three files, enforced by an allowlist in `server.js`:
  `manifests/manifest.json`, `manifests/2026-06-16-h1.md`, and `dashboard.md`.
- It cannot write to `public/`, cannot edit any site code (`app/`, `components/`, `lib/`,
  checkout, Stripe, cart, calculator, guide, editorial, search, chooser), cannot publish,
  and cannot wire assets. There is no code path that does any of those.

## Local status values

`prompt-ready`, `draft-needed`, `drafted`, `review`, `approved`, `wired`,
`published-offsite`, `revise`, `rejected`. The older `approval_status` field is kept in
sync automatically (approved/wired/published-offsite map to `approved`).
