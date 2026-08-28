import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { evaluateAnswer } from '../src/scripts/quiz.mjs';

test('evaluateAnswer distinguishes missing, correct, and incorrect answers', () => {
  assert.deepEqual(evaluateAnswer('', 'b', '解释'), {
    status: 'unanswered',
    message: '请先选择一个答案。',
  });
  assert.deepEqual(evaluateAnswer('b', 'b', '解释'), {
    status: 'correct',
    message: '回答正确。解释',
  });
  assert.deepEqual(evaluateAnswer('a', 'b', '解释'), {
    status: 'incorrect',
    message: '还差一点。解释',
  });
});

test('generated quiz has three fieldsets and a live result region', async () => {
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  assert.equal((html.match(/data-quiz-question=/g) ?? []).length, 3);
  assert.match(html, /class="quiz-stack"/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /查看答案/);
});
