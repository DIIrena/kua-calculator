'use strict';

/*
 * Video-pin renderer: loads a seek-driven animated pin HTML, captures
 * deterministic frames via Puppeteer (window.seek(t) per frame), and
 * encodes an H.264 MP4 with the system ffmpeg. Silent by design
 * (Pinterest autoplays muted).
 *
 * Usage: node render-pin-video.js <animation.html> <out-name> [durationSec] [fps]
 * Output: visual-production/drafts/pins/<out-name>.mp4 (git-ignored).
 */

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { execFileSync } = require('node:child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const VP_ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(VP_ROOT, 'drafts', 'pins');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const puppeteer = require(path.join(PROJECT_ROOT, 'node_modules', 'puppeteer-core'));

const [htmlFile, htmlQuery] = (process.argv[2] || 'pin-video-good-days.html').split('?');
const htmlPath = path.resolve(__dirname, htmlFile);
const outName = process.argv[3] || 'good-days-2026-video';
const DUR = Number(process.argv[4] || 15);
const FPS = Number(process.argv[5] || 30);

(async () => {
  const frameDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pin-frames-'));
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--allow-file-access-from-files', '--hide-scrollbars', '--force-device-scale-factor=1'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 1500 });
  const url =
    'file:///' + htmlPath.replace(/\\/g, '/').replace(/ /g, '%20') +
    (htmlQuery ? '?' + htmlQuery : '');
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.waitForFunction('window.__logoReady === true && typeof window.seek === "function"', { timeout: 15000 });

  const total = Math.round(DUR * FPS);
  console.log(`capturing ${total} frames at ${FPS}fps...`);
  for (let i = 0; i < total; i++) {
    await page.evaluate((t) => window.seek(t), i / FPS);
    await page.screenshot({
      path: path.join(frameDir, `f${String(i).padStart(5, '0')}.png`),
      clip: { x: 0, y: 0, width: 1000, height: 1500 },
    });
    if (i % 60 === 0) console.log(`  frame ${i}/${total}`);
  }
  await browser.close();

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const outPath = path.join(OUT_DIR, `${outName}.mp4`);
  console.log('encoding with ffmpeg...');
  execFileSync('ffmpeg', [
    '-y',
    '-framerate', String(FPS),
    '-i', path.join(frameDir, 'f%05d.png'),
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-crf', '18',
    '-preset', 'slow',
    '-movflags', '+faststart',
    outPath,
  ], { stdio: ['ignore', 'ignore', 'inherit'] });

  fs.rmSync(frameDir, { recursive: true, force: true });
  const size = fs.statSync(outPath).size;
  console.log(`done: ${outPath} (${(size / 1e6).toFixed(2)} MB, ${DUR}s, 1000x1500)`);
})().catch((e) => {
  console.error('ERR', e.message);
  process.exit(1);
});
