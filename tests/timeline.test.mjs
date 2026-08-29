import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const outputFile = new URL('../dist/index.html', import.meta.url);

test('timeline renders four artwork periods and all four categories', async () => {
  const html = await readFile(outputFile, 'utf8');
  assert.equal((html.match(/data-timeline-event=/g) ?? []).length, 4);
  assert.equal((html.match(/data-timeline-button=/g) ?? []).length, 4);
  assert.equal((html.match(/data-timeline-panel=/g) ?? []).length, 4);
  assert.match(html, /aria-controls="timeline-panel-[^"]+"/);
  assert.match(html, /data-artwork-card="gare-saint-lazare"/);
  assert.match(html, /timeline-artwork-card-summary/);
  assert.doesNotMatch(html, /data-timeline-button="third-exhibition-1877"/);
  assert.equal((html.match(/data-artwork-card="paris-street-rainy-day"/g) ?? []).length, 1);
  assert.equal((html.match(/data-artwork-card="gare-saint-lazare"/g) ?? []).length, 1);
  assert.equal((html.match(/data-artwork-card="moulin-de-la-galette"/g) ?? []).length, 1);
  assert.equal((html.match(/data-artwork-card="bar-at-the-folies-bergere"/g) ?? []).length, 1);
  for (const category of ['城市', '工业', '社会', '艺术市场']) {
    assert.match(html, new RegExp(`data-category="${category}"`));
  }
  assert.ok(html.indexOf('1837—1877') < html.indexOf('1850年代—1870年代'));
  assert.ok(html.indexOf('1850年代—1870年代') < html.indexOf('1860年代—1870年代'));
  assert.ok(html.indexOf('1860年代—1870年代') < html.indexOf('1874—1882'));
});
