import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const outputFile = new URL('../dist/index.html', import.meta.url);

test('timeline renders eight ordered events and all four categories', async () => {
  const html = await readFile(outputFile, 'utf8');
  assert.equal((html.match(/data-timeline-event=/g) ?? []).length, 8);
  for (const category of ['城市', '工业', '社会', '艺术市场']) {
    assert.match(html, new RegExp(`data-category="${category}"`));
  }
  assert.ok(html.indexOf('1837') < html.indexOf('1882'));
});
