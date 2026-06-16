'use strict';

const $ = (sel, root = document) => root.querySelector(sel);

let STATE = { statuses: [], assets: [], warning: '', batchId: '' };

function el(tag, opts = {}, children = []) {
  const node = document.createElement(tag);
  if (opts.class) node.className = opts.class;
  if (opts.text != null) node.textContent = opts.text;
  if (opts.html != null) node.innerHTML = opts.html;
  if (opts.attrs) for (const [k, v] of Object.entries(opts.attrs)) node.setAttribute(k, v);
  if (opts.on) for (const [k, v] of Object.entries(opts.on)) node.addEventListener(k, v);
  for (const c of [].concat(children)) if (c) node.appendChild(c);
  return node;
}

function field(label, valueNode) {
  const dt = el('dt', { text: label });
  const dd = valueNode instanceof Node ? valueNode : el('dd', { text: valueNode == null ? '' : String(valueNode) });
  if (!(valueNode instanceof Node)) return [dt, dd];
  const wrap = el('dd');
  wrap.appendChild(valueNode);
  return [dt, wrap];
}

async function load() {
  const res = await fetch('/api/manifest');
  const data = await res.json();
  const batch = data.batches[0] || { assets: [], batch_id: '' };
  STATE = { statuses: data.statuses, assets: batch.assets, warning: data.warning, batchId: batch.batch_id };
  $('#warning').textContent = data.warning;
  $('#batchTag').textContent = batch.batch_id;
  render();
}

function statusSelect(asset) {
  const sel = el('select');
  for (const s of STATE.statuses) {
    sel.appendChild(el('option', { text: s, attrs: s === asset.status ? { value: s, selected: 'selected' } : { value: s } }));
  }
  return sel;
}

function card(asset) {
  const c = el('div', { class: 'card' });

  // head
  const head = el('div', { class: 'card-head' }, [
    el('span', { class: 'id', text: asset.asset_id }),
    el('span', { class: 'title', text: asset.title }),
    el('span', { class: 'badges' }, [
      el('span', { class: 'badge kind', text: asset.kind }),
      el('span', { class: 'badge', text: asset.tool }),
    ]),
  ]);
  c.appendChild(head);

  // status pill
  const pill = el('span', { class: `status-pill s-${asset.status}`, text: asset.status });

  // fields
  const dl = el('dl', { class: 'fields' });
  const promptLink = asset.prompt_exists
    ? el('a', { text: asset.prompt_path, attrs: { href: '#' }, on: { click: (e) => { e.preventDefault(); viewPrompt(asset.asset_id); } } })
    : el('span', { class: 'muted', text: (asset.prompt_path || 'none') + ' (missing)' });
  const csNode = asset.contact_sheet_exists
    ? el('a', { text: 'view contact sheet', attrs: { href: `/files/${asset.contact_sheet_path}`, target: '_blank' } })
    : el('span', { class: 'muted', text: 'none yet' });

  const pairs = [
    ['Status', pill],
    ['Type', asset.kind],
    ['Tool', asset.tool],
    ['Prompt', promptLink],
    ['Draft folder', el('span', { class: asset.draft_files.length ? '' : 'muted', text: asset.draft_folder + (asset.draft_files.length ? '' : ' (empty)') })],
    ['Contact sheet', csNode],
    ['Target / use', asset.target_public_path || el('span', { class: 'muted', text: 'off-site (no public path)' })],
    ['Selected', asset.selected_output || el('span', { class: 'muted', text: 'none' })],
    ['Next action', el('span', { class: 'muted', text: asset.next_action })],
  ];
  for (const [label, val] of pairs) {
    const [dt, dd] = field(label, val);
    dl.appendChild(dt); dl.appendChild(dd);
  }
  c.appendChild(dl);

  // contact sheet preview
  if (asset.contact_sheet_exists) {
    c.appendChild(el('div', { class: 'contact' }, [
      el('img', { attrs: { src: `/files/${asset.contact_sheet_path}`, alt: `${asset.asset_id} contact sheet`, loading: 'lazy' } }),
    ]));
  }

  // draft media previews
  if (asset.draft_files.length) {
    const media = el('div', { class: 'media' });
    for (const rel of asset.draft_files) {
      const isVideo = /\.(mp4|webm|mov)$/i.test(rel);
      media.appendChild(isVideo
        ? el('video', { attrs: { src: `/files/${rel}`, controls: 'controls', preload: 'metadata' } })
        : el('img', { attrs: { src: `/files/${rel}`, alt: rel, loading: 'lazy' } }));
    }
    c.appendChild(media);
  } else {
    c.appendChild(el('div', { class: 'muted', text: 'No drafts yet. They appear here after a generation run.' }));
  }

  // controls
  const controls = el('div', { class: 'controls' });

  const sel = statusSelect(asset);
  controls.appendChild(el('div', { class: 'row' }, [el('label', { text: 'Local status' }), sel]));

  const selectedInput = el('input', { attrs: { type: 'text', value: asset.selected_output || '', placeholder: 'e.g. var-3.png', list: `dl-${asset.asset_id}` } });
  const datalist = el('datalist', { attrs: { id: `dl-${asset.asset_id}` } });
  for (const rel of asset.draft_files) {
    const name = rel.split('/').pop();
    datalist.appendChild(el('option', { attrs: { value: name } }));
  }
  controls.appendChild(el('div', { class: 'row' }, [el('label', { text: 'Selected output' }), selectedInput, datalist]));

  const notes = el('textarea', { attrs: { placeholder: 'Owner notes...' } });
  notes.value = asset.notes || '';
  controls.appendChild(el('div', { class: 'row' }, [el('label', { text: 'Owner notes' }), notes]));

  const flash = el('span', { class: 'saved-flash' });
  const saveBtn = el('button', {
    class: 'btn small', text: 'Save', attrs: { type: 'button' },
    on: { click: async () => {
      saveBtn.disabled = true;
      flash.textContent = 'Saving...';
      try {
        await saveAsset(asset.asset_id, { status: sel.value, selected_output: selectedInput.value.trim(), notes: notes.value });
        flash.textContent = 'Saved. Markdown regenerated.';
      } catch (err) {
        flash.textContent = 'Error: ' + err.message;
      } finally {
        saveBtn.disabled = false;
      }
    } },
  });

  const viewBtn = el('button', {
    class: 'btn small secondary', text: 'View prompt', attrs: { type: 'button' },
    on: { click: () => viewPrompt(asset.asset_id) },
  });

  controls.appendChild(el('div', { class: 'row' }, [saveBtn, viewBtn, flash]));
  c.appendChild(controls);

  return c;
}

function render() {
  const grid = $('#grid');
  grid.setAttribute('aria-busy', 'false');
  grid.replaceChildren();
  for (const asset of STATE.assets) grid.appendChild(card(asset));
}

async function saveAsset(asset_id, patch) {
  const res = await fetch('/api/asset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ asset_id, ...patch }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'save failed');
  const batch = data.batches[0];
  STATE.assets = batch.assets;
  render();
}

async function viewPrompt(asset_id) {
  const res = await fetch(`/api/prompt?id=${encodeURIComponent(asset_id)}`);
  const data = await res.json();
  $('#modalTitle').textContent = res.ok ? data.path : 'Prompt not found';
  $('#modalBody').textContent = res.ok ? data.text : (data.error || 'not found');
  $('#modal').classList.remove('hidden');
}

function closeModal() { $('#modal').classList.add('hidden'); }

$('#reloadBtn').addEventListener('click', load);
$('#modalClose').addEventListener('click', closeModal);
$('#modal').addEventListener('click', (e) => { if (e.target === $('#modal')) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

load().catch((err) => {
  $('#grid').textContent = 'Failed to load: ' + err.message;
});
