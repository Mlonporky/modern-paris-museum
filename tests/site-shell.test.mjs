import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const outputFile = new URL('../dist/index.html', import.meta.url);

test('generated homepage declares Chinese and the exhibition title', async () => {
  const html = await readFile(outputFile, 'utf8');
  assert.match(html, /<html lang="zh-CN">/);
  assert.match(html, /光线照进现代巴黎/);
});
