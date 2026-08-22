export function evaluateAnswer(selected, correct, explanation) {
  if (!selected) {
    return { status: 'unanswered', message: '请先选择一个答案。' };
  }

  if (selected === correct) {
    return { status: 'correct', message: `回答正确。${explanation}` };
  }

  return { status: 'incorrect', message: `还差一点。${explanation}` };
}
