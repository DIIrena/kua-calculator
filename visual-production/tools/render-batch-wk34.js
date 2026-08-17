'use strict';

/*
 * Week 34 content batch: renders the five vertical tip videos
 * (1080x1920, 14s) through tip-video.html + render-pin-video.js.
 * Scripts follow the house voice: no outcome promises ("the tradition
 * says" framing), no em dashes, benefit-led. Captions + links live in
 * spec/content-batch-wk34-2026-08-17.md.
 *
 * Usage: node render-batch-wk34.js [only-name]
 */

const { execFileSync } = require('node:child_process');
const path = require('node:path');

const VIDEOS = [
  {
    name: 'wk34-i1-birth-code',
    cfg: {
      hook: ['Your birth date', 'has a code in it'],
      beats: [
        ['Four pairs of characters:', 'year, month, day, hour.'],
        ['One of them is you:', 'the Day Master.'],
        ['Yours takes ten seconds', 'to find, free.'],
      ],
      cta: ['Get your free BaZi chart'],
      url: 'myfengshuihome.com',
    },
  },
  {
    name: 'wk34-i2-not-just-your-animal',
    cfg: {
      hook: ['Your zodiac animal', 'is only 1 of 4'],
      beats: [
        ['The year animal is the one', 'the world knows you by.'],
        ['Month, day, and hour', 'each add another.'],
        ['The day one, says the', 'tradition, is the real you.'],
      ],
      cta: ['Meet your Day Master, free'],
      url: 'myfengshuihome.com',
    },
  },
  {
    name: 'wk34-i3-january-birthday',
    cfg: {
      hook: ['Born in January?', 'Your sign may be wrong'],
      beats: [
        ['The BaZi year turns at', 'Li Chun, near February 4.'],
        ['Not on January 1, and not', 'at the lantern new year.'],
        ['January babies often belong', 'to the year before.'],
      ],
      cta: ['Check your true chart, free'],
      url: 'myfengshuihome.com',
    },
  },
  {
    name: 'wk34-h1-bed-direction',
    cfg: {
      hook: ['Which way your bed', 'faces matters'],
      beats: [
        ['The tradition gives you four', 'supportive directions.'],
        ['Your birth year picks them:', 'your Kua number.'],
        ['Headboard to a supportive', 'wall, says the system.'],
      ],
      cta: ['Find your four directions, free'],
      url: 'myfengshuihome.com',
    },
  },
  {
    name: 'wk34-h2-august-good-days',
    cfg: {
      hook: ['August has its', 'good days marked'],
      beats: [
        ['The tradition marks days', 'for starting and signing.'],
        ['And the days it keeps', 'for routine instead.'],
        ['This month’s favourable', 'days are listed, free.'],
      ],
      cta: ['See the Good-Days calendar'],
      url: 'myfengshuihome.com',
    },
  },
];

const only = process.argv[2];
for (const v of VIDEOS) {
  if (only && v.name !== only) continue;
  const query = 'cfg=' + encodeURIComponent(JSON.stringify(v.cfg));
  console.log(`\n=== ${v.name} ===`);
  execFileSync(
    'node',
    [
      path.join(__dirname, 'render-pin-video.js'),
      `tip-video.html?${query}`,
      v.name,
      '14',
      '30',
      '1080x1920',
    ],
    { stdio: 'inherit', cwd: __dirname },
  );
}
console.log('\nBatch complete.');
