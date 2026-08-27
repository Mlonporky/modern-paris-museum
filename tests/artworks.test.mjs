import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const outputFile = new URL('../dist/index.html', import.meta.url);

test('artwork viewer renders structured interpretation and source data', async () => {
  const html = await readFile(outputFile, 'utf8');
  assert.match(html, /data-artwork-viewer="paris-street-rainy-day"/);
  assert.match(html, /看见什么/);
  assert.match(html, /时代发生了什么/);
  assert.match(html, /钱与生活如何改变/);
  assert.match(html, /芝加哥艺术博物馆/);
  assert.match(html, /alt="雨后的宽阔巴黎街口/);
});

test('Monet chapter connects the station to industrial change', async () => {
  const html = await readFile(outputFile, 'utf8');
  assert.match(html, /data-artwork-viewer="gare-saint-lazare"/);
  assert.match(html, /克洛德·莫奈/);
  assert.ok((html.match(/data-artwork-viewer=/g) ?? []).length >= 2);
});

test('Renoir chapter renders leisure and consumption content', async () => {
  const html = await readFile(outputFile, 'utf8');
  assert.match(html, /data-artwork-viewer="moulin-de-la-galette"/);
  assert.match(html, /皮埃尔-奥古斯特·雷诺阿/);
  assert.ok((html.match(/data-artwork-viewer=/g) ?? []).length >= 3);
});

test('final page renders four artwork chapters in curatorial order', async () => {
  const html = await readFile(outputFile, 'utf8');
  const ids = [...html.matchAll(/data-artwork-viewer="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(ids, [
    'paris-street-rainy-day',
    'gare-saint-lazare',
    'moulin-de-la-galette',
    'bar-at-the-folies-bergere',
  ]);
  assert.match(html, /马奈是印象派的重要先驱/);
});

test('artwork interpretation is rendered only inside the viewer', async () => {
  const html = await readFile(outputFile, 'utf8');
  assert.equal((html.match(/class="artwork-viewer-essay"/g) ?? []).length, 4);
  assert.equal((html.match(/class="artwork-essay"/g) ?? []).length, 0);
  assert.equal((html.match(/>看见什么<\/h2>/g) ?? []).length, 4);
});
