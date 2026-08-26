import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const outputFile = new URL('../dist/index.html', import.meta.url);

test('generated homepage has Chinese metadata and the exhibition viewer', async () => {
  const html = await readFile(outputFile, 'utf8');
  assert.match(html, /<html lang="zh-CN">/);
  assert.match(html, /<title>光线照进现代巴黎/);
  assert.match(html, /name="description"/);
  assert.doesNotMatch(html, /class="site-nav"/);
  assert.equal((html.match(/data-artwork-viewer=/g) ?? []).length, 4);
  assert.match(html, /data-artwork-open="gare-saint-lazare"/);
});

test('page explains both urban transformation and the new art market', async () => {
  const html = await readFile(outputFile, 'utf8');
  assert.match(html, /城市为何改变/);
  assert.match(html, /谁为新艺术买单/);
  assert.match(html, /画商保罗·杜朗-吕埃尔/);
  assert.match(html, /独立展览/);
});
