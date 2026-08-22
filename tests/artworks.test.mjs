import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const outputFile = new URL('../dist/index.html', import.meta.url);

test('first artwork renders structured interpretation and source data', async () => {
  const html = await readFile(outputFile, 'utf8');
  assert.match(html, /data-artwork-id="paris-street-rainy-day"/);
  assert.match(html, /看见什么/);
  assert.match(html, /时代发生了什么/);
  assert.match(html, /钱与生活如何改变/);
  assert.match(html, /芝加哥艺术博物馆/);
  assert.match(html, /alt="雨后的宽阔巴黎街口/);
});

test('Monet chapter connects the station to industrial change', async () => {
  const html = await readFile(outputFile, 'utf8');
  assert.match(html, /data-artwork-id="gare-saint-lazare"/);
  assert.match(html, /克洛德·莫奈/);
  assert.equal((html.match(/data-artwork-id=/g) ?? []).length, 2);
});
