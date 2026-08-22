import assert from 'node:assert/strict';
import { open, stat } from 'node:fs/promises';

const files = [
  'paris-street-rainy-day.jpg',
  'gare-saint-lazare.jpg',
  'moulin-de-la-galette.jpg',
  'bar-at-the-folies-bergere.jpg',
];

for (const file of files) {
  const url = new URL(`../public/images/${file}`, import.meta.url);
  const info = await stat(url);
  assert.ok(info.size > 100_000, `${file} is unexpectedly small`);
  const handle = await open(url, 'r');
  const signature = Buffer.alloc(3);
  await handle.read(signature, 0, 3, 0);
  await handle.close();
  assert.deepEqual([...signature], [0xff, 0xd8, 0xff], `${file} is not a JPEG`);
  console.log(`ok ${file} ${info.size} bytes`);
}
