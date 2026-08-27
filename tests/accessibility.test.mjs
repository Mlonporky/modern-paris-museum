import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const htmlFile = new URL('../dist/index.html', import.meta.url);
const cssFile = new URL('../dist/_astro/', import.meta.url);

test('page has one h1, a skip link, descriptive images, and source links', async () => {
  const html = await readFile(htmlFile, 'utf8');
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1);
  assert.match(html, /class="skip-link" href="#main-content"/);
  assert.equal((html.match(/data-artwork-viewer=/g) ?? []).length, 4);
  assert.equal((html.match(/data-artwork-id=/g) ?? []).length, 0);
  assert.ok((html.match(/<img[^>]+alt="[^"]{20,}"/g) ?? []).length >= 5);
  assert.equal((html.match(/data-artwork-source=/g) ?? []).length, 4);
  assert.equal((html.match(/data-image-source=/g) ?? []).length, 4);
});

test('built CSS contains reduced-motion and visible-focus rules', async () => {
  const { readdir } = await import('node:fs/promises');
  const files = await readdir(cssFile);
  const cssName = files.find((name) => name.endsWith('.css'));
  assert.ok(cssName, 'expected a generated CSS asset');
  const css = await readFile(new URL(cssName, cssFile), 'utf8');
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /focus-visible/);
});

test('built CSS keeps the full exhibition on a dark theme', async () => {
  const { readdir } = await import('node:fs/promises');
  const files = await readdir(cssFile);
  const cssName = files.find((name) => name.endsWith('.css'));
  assert.ok(cssName, 'expected a generated CSS asset');
  const css = await readFile(new URL(cssName, cssFile), 'utf8');
  assert.match(css, /body\{[^}]*color:var\(--paper-light\)[^}]*background:#0b0b0b/);
  assert.match(css, /\.exhibition-intro\{[^}]*background:#0b0b0b/);
  assert.match(css, /\.quiz-section\{[^}]*background:#0b0b0b/);
});
