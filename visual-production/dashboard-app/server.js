'use strict';

/*
 * Visual Production Dashboard - local-only control panel for the H1 batch.
 *
 * Stack: zero dependencies. Node built-ins only (node:http, node:fs, node:path).
 * No build step, no node_modules, no framework.
 *
 * Hard safety rules enforced in code:
 *   - Binds to 127.0.0.1 only (never exposed on the network).
 *   - Reads are confined to the visual-production/ tree (VP_ROOT). No traversal out.
 *   - Writes are confined to a THREE-FILE allowlist inside visual-production/:
 *       manifests/manifest.json, manifests/2026-06-16-h1.md, dashboard.md
 *   - There is no code path that writes to public/, app/, components/, lib/,
 *     or anything outside visual-production/. The server cannot wire or publish.
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const APP_DIR = __dirname;                                  // .../visual-production/dashboard-app
const VP_ROOT = path.resolve(APP_DIR, '..');                // .../visual-production
const WEB_DIR = path.join(APP_DIR, 'web');
const MANIFEST_PATH = path.join(VP_ROOT, 'manifests', 'manifest.json');
const BATCH_ID = '2026-06-16-h1';
const BATCH_MD_PATH = path.join(VP_ROOT, 'manifests', `${BATCH_ID}.md`);
const DASHBOARD_MD_PATH = path.join(VP_ROOT, 'dashboard.md');

const HOST = '127.0.0.1';
const PORT = Number(process.env.VP_DASHBOARD_PORT || 4317);

const STATUSES = [
  'prompt-ready', 'draft-needed', 'drafted', 'review',
  'approved', 'wired', 'published-offsite', 'revise', 'rejected',
];

const NEXT_ACTION = {
  'prompt-ready': 'generate drafts (separate, approved step)',
  'draft-needed': 'generate drafts (separate, approved step)',
  'drafted': 'owner reviews the contact sheet',
  'review': 'owner selects a variation and approves',
  'approved': 'owner does the manual layout, then wiring (separate step)',
  'wired': 'installed on-site',
  'published-offsite': 'published to channel',
  'revise': 'adjust the prompt and re-generate',
  'rejected': 'dropped',
};

const WARNING = 'Drafts are not public. Approved assets still need a separate wiring step.';

const MEDIA_EXT = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg',
  '.mp4', '.webm', '.mov', '.md', '.txt', '.json', '.pdf',
]);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime',
  '.md': 'text/markdown; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf',
};

const WRITE_ALLOWLIST = new Set([MANIFEST_PATH, BATCH_MD_PATH, DASHBOARD_MD_PATH].map((p) => path.resolve(p)));

// ---- safety helpers -------------------------------------------------------

function withinVpRoot(p) {
  const rp = path.resolve(p);
  return rp === VP_ROOT || rp.startsWith(VP_ROOT + path.sep);
}

function assertWritable(p) {
  const rp = path.resolve(p);
  if (!withinVpRoot(rp)) throw new Error(`refused: write outside visual-production (${rp})`);
  if (!WRITE_ALLOWLIST.has(rp)) throw new Error(`refused: not in write allowlist (${rp})`);
}

// Resolve a client-supplied relative path to an absolute path inside VP_ROOT.
// Returns null if it escapes the tree.
function safeResolve(relPath) {
  const clean = String(relPath || '').replace(/^[/\\]+/, '');
  const abs = path.resolve(VP_ROOT, clean);
  return withinVpRoot(abs) ? abs : null;
}

// ---- manifest + markdown --------------------------------------------------

function readManifest() {
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
}

function deriveStatus(asset) {
  if (asset.status && STATUSES.includes(asset.status)) return asset.status;
  switch (asset.approval_status) {
    case 'approved': return 'approved';
    case 'revise': return 'revise';
    case 'rejected': return 'rejected';
    default: return 'prompt-ready';
  }
}

function approvalFromStatus(status) {
  if (status === 'approved' || status === 'wired' || status === 'published-offsite') return 'approved';
  if (status === 'rejected') return 'rejected';
  if (status === 'revise') return 'revise';
  return 'pending';
}

// Re-key each asset so new fields land in a tidy order. Pure data, no side effects.
function normalizeAsset(a) {
  const status = deriveStatus(a);
  return {
    asset_id: a.asset_id,
    batch_id: a.batch_id,
    title: a.title,
    kind: a.kind,
    prompt_path: a.prompt_path,
    tool: a.tool,
    settings: a.settings,
    output_filenames: Array.isArray(a.output_filenames) ? a.output_filenames : [],
    contact_sheet_path: a.contact_sheet_path,
    target_public_path: a.target_public_path ?? null,
    status,
    approval_status: approvalFromStatus(status),
    selected_output: a.selected_output ?? null,
    rejected: status === 'rejected',
    notes: a.notes || '',
  };
}

function normalizeManifest(m) {
  return {
    batches: (m.batches || []).map((b) => ({
      ...b,
      assets: (b.assets || []).map(normalizeAsset),
    })),
  };
}

function saveManifest(m) {
  assertWritable(MANIFEST_PATH);
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(m, null, 2) + '\n');
}

// Compute read-only view data (file existence, draft listing). Never mutates.
function enrichAsset(a) {
  const draftFolderRel = `drafts/${a.batch_id}/${a.asset_id}`;
  const draftFolderAbs = path.join(VP_ROOT, draftFolderRel);
  let draftFiles = [];
  if (fs.existsSync(draftFolderAbs) && fs.statSync(draftFolderAbs).isDirectory()) {
    draftFiles = fs.readdirSync(draftFolderAbs)
      .filter((f) => MEDIA_EXT.has(path.extname(f).toLowerCase()))
      .sort()
      .map((f) => `${draftFolderRel}/${f}`);
  }
  const promptAbs = a.prompt_path ? path.join(VP_ROOT, a.prompt_path) : null;
  const csAbs = a.contact_sheet_path ? path.join(VP_ROOT, a.contact_sheet_path) : null;
  return {
    ...a,
    draft_folder: draftFolderRel,
    next_action: NEXT_ACTION[a.status] || '',
    prompt_exists: !!(promptAbs && fs.existsSync(promptAbs)),
    contact_sheet_exists: !!(csAbs && fs.existsSync(csAbs)),
    draft_files: draftFiles,
  };
}

function targetLabel(a) {
  return a.target_public_path ? a.target_public_path : 'off-site (no public path)';
}

function countByStatus(assets) {
  const counts = Object.fromEntries(STATUSES.map((s) => [s, 0]));
  for (const a of assets) counts[a.status] = (counts[a.status] || 0) + 1;
  return counts;
}

function renderBatchMd(manifest) {
  const batch = manifest.batches[0];
  const assets = batch.assets;
  const rows = assets.map((a) =>
    `| ${a.asset_id} ${a.title} | ${a.kind} | ${a.tool} | ${a.status} | ${a.selected_output || '-'} | \`${a.contact_sheet_path}\` | ${targetLabel(a)} | ${NEXT_ACTION[a.status] || ''} |`
  ).join('\n');
  return `# H1 pilot pack - review sheet

**Batch:** ${batch.batch_id}
**Created:** ${batch.created}
**Generated by:** the local Visual Production Dashboard (do not hand-edit; it is regenerated on each save).

> ${WARNING}

This sheet is generated from \`manifest.json\`. Drafts and contact sheets exist only after a production run.

| Asset | Type | Tool | Status | Selected | Contact sheet | Target / use | Next action |
|---|---|---|---|---|---|---|---|
${rows}

## Legend

- **Status:** ${STATUSES.join(', ')}.
- **Selected:** the chosen variation filename once the owner picks one.
- **Next action:** the immediate step. Generation and wiring are each separate, separately-approved steps.
`;
}

function renderDashboardMd(manifest) {
  const batch = manifest.batches[0];
  const assets = batch.assets;
  const counts = countByStatus(assets);
  const countLine = STATUSES.map((s) => `${s} ${counts[s]}`).join(', ');
  const rows = assets.map((a) =>
    `| ${a.asset_id} | ${a.title} | ${a.kind} | ${a.tool} | ${a.status} | ${a.selected_output || '-'} | ${targetLabel(a)} | ${NEXT_ACTION[a.status] || ''} |`
  ).join('\n');
  const noted = assets.filter((a) => a.notes && a.notes.trim());
  const notesBlock = noted.length
    ? noted.map((a) => `- **${a.asset_id}:** ${a.notes.replace(/\n+/g, ' ')}`).join('\n')
    : '- (none yet)';
  return `# Visual Production Dashboard - ${batch.batch_id}

> ${WARNING}

Local-only control panel state, generated from \`manifests/manifest.json\`. Not deployed, not linked from the website. The dashboard app lives in \`dashboard-app/\` and only reads and writes inside \`visual-production/\`.

**Batch:** ${batch.batch_id} - ${batch.description || ''}

**Status counts:** ${countLine}.

| ID | Asset | Type | Tool | Status | Selected | Target / use | Next action |
|---|---|---|---|---|---|---|---|
${rows}

## Owner notes

${notesBlock}
`;
}

function regenerateMarkdown(manifest) {
  assertWritable(BATCH_MD_PATH);
  fs.writeFileSync(BATCH_MD_PATH, renderBatchMd(manifest));
  assertWritable(DASHBOARD_MD_PATH);
  fs.writeFileSync(DASHBOARD_MD_PATH, renderDashboardMd(manifest));
}

// Normalize the manifest on disk and regenerate both markdown files. Used by
// `node server.js --regen` and after every save.
function persist(manifest) {
  const normalized = normalizeManifest(manifest);
  saveManifest(normalized);
  regenerateMarkdown(normalized);
  return normalized;
}

// ---- http -----------------------------------------------------------------

function sendJson(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(body);
}

function sendText(res, code, text, type) {
  res.writeHead(code, { 'Content-Type': type || 'text/plain; charset=utf-8' });
  res.end(text);
}

function serveFile(res, absPath) {
  const ext = path.extname(absPath).toLowerCase();
  fs.readFile(absPath, (err, data) => {
    if (err) { sendText(res, 404, 'not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (c) => { data += c; if (data.length > 2e6) req.destroy(); });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function enrichedManifest() {
  const m = normalizeManifest(readManifest());
  return {
    warning: WARNING,
    statuses: STATUSES,
    batches: m.batches.map((b) => ({ ...b, assets: b.assets.map(enrichAsset) })),
  };
}

const server = http.createServer(async (req, res) => {
  try {
    const u = new URL(req.url, `http://${HOST}:${PORT}`);
    const pathname = decodeURIComponent(u.pathname);

    // --- API: read manifest (enriched with file-existence info) ---
    if (req.method === 'GET' && pathname === '/api/manifest') {
      return sendJson(res, 200, enrichedManifest());
    }

    // --- API: raw prompt text ---
    if (req.method === 'GET' && pathname === '/api/prompt') {
      const id = u.searchParams.get('id');
      const m = normalizeManifest(readManifest());
      const asset = m.batches.flatMap((b) => b.assets).find((a) => a.asset_id === id);
      if (!asset) return sendJson(res, 404, { error: 'unknown asset' });
      const abs = safeResolve(asset.prompt_path);
      if (!abs || !fs.existsSync(abs)) return sendJson(res, 404, { error: 'prompt file not found', path: asset.prompt_path });
      return sendJson(res, 200, { path: asset.prompt_path, text: fs.readFileSync(abs, 'utf8') });
    }

    // --- API: update one asset (status / selected_output / notes) ---
    if (req.method === 'POST' && pathname === '/api/asset') {
      const body = JSON.parse((await readBody(req)) || '{}');
      const { asset_id } = body;
      if (!asset_id) return sendJson(res, 400, { error: 'asset_id required' });
      if (body.status !== undefined && !STATUSES.includes(body.status)) {
        return sendJson(res, 400, { error: 'invalid status', allowed: STATUSES });
      }
      const m = normalizeManifest(readManifest());
      let found = null;
      for (const b of m.batches) {
        for (const a of b.assets) {
          if (a.asset_id === asset_id) { found = a; break; }
        }
      }
      if (!found) return sendJson(res, 404, { error: 'unknown asset' });
      if (body.status !== undefined) found.status = body.status;
      if (body.selected_output !== undefined) {
        found.selected_output = (body.selected_output === '' ? null : body.selected_output);
      }
      if (body.notes !== undefined) found.notes = String(body.notes);
      const saved = persist(m);
      const enriched = {
        warning: WARNING,
        statuses: STATUSES,
        batches: saved.batches.map((b) => ({ ...b, assets: b.assets.map(enrichAsset) })),
      };
      return sendJson(res, 200, enriched);
    }

    // --- read-only static file serving from inside visual-production/ ---
    if (req.method === 'GET' && pathname.startsWith('/files/')) {
      const abs = safeResolve(pathname.slice('/files/'.length));
      if (!abs) return sendText(res, 403, 'forbidden');
      const ext = path.extname(abs).toLowerCase();
      if (!MEDIA_EXT.has(ext)) return sendText(res, 403, 'forbidden file type');
      if (!fs.existsSync(abs)) return sendText(res, 404, 'not found');
      return serveFile(res, abs);
    }

    // --- UI static assets (from dashboard-app/web) ---
    if (req.method === 'GET') {
      const rel = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
      const abs = path.join(WEB_DIR, rel);
      if (abs === WEB_DIR || abs.startsWith(WEB_DIR + path.sep)) {
        if (fs.existsSync(abs) && fs.statSync(abs).isFile()) return serveFile(res, abs);
      }
      return sendText(res, 404, 'not found');
    }

    return sendText(res, 405, 'method not allowed');
  } catch (err) {
    sendJson(res, 500, { error: String(err && err.message || err) });
  }
});

// ---- entry ----------------------------------------------------------------

if (process.argv.includes('--regen')) {
  const saved = persist(readManifest());
  const counts = countByStatus(saved.batches[0].assets);
  console.log('Regenerated manifest.json, ' + path.basename(BATCH_MD_PATH) + ', and dashboard.md');
  console.log('Status counts:', JSON.stringify(counts));
  process.exit(0);
}

server.listen(PORT, HOST, () => {
  console.log(`Visual Production Dashboard running at http://${HOST}:${PORT}`);
  console.log(WARNING);
  console.log(`Write scope: ${VP_ROOT} (allowlist: manifest.json, ${BATCH_ID}.md, dashboard.md). Local-only.`);
});
