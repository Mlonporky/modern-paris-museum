import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const outputFile = new URL('../dist/index.html', import.meta.url);

test('generated homepage has Chinese metadata and primary navigation', async () => {
  const html = await readFile(outputFile, 'utf8');
  assert.match(html, /<html lang="zh-CN">/);
  assert.match(html, /<title>光线照进现代巴黎/);
  assert.match(html, /name="description"/);
  assert.match(html, /href="#timeline"/);
  assert.match(html, /href="#artworks"/);
  assert.match(html, /href="#quiz"/);
  assert.match(html, /href="#sources"/);
});
