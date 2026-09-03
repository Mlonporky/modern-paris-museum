import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const outputFile = new URL('../dist/index.html', import.meta.url);

test('homepage opens with a six-century gateway into the Paris exhibition', async () => {
  const html = await readFile(outputFile, 'utf8');

  assert.match(html, /class="century-gateway"/);
  assert.equal((html.match(/data-century="/g) ?? []).length, 6);
  assert.match(html, /data-century="19"/);
  assert.match(html, /aria-pressed="true"/);
  assert.match(html, /data-enter-paris/);
  assert.match(html, /id="paris-exhibition"/);
  assert.match(html, /window\.history\.replaceState/);
});
