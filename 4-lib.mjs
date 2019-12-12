export const getNextToCheck = n => n + 1;

export const splitNumber = n => [...('' + n)].map(d => +d);
export const hasRepeatingDigit = digits => digits.some((digit, index) => digits[index + 1] === digit);
export const hasNoMoreThanTwoRepeatingDigits = digits =>
  digits.every((digit, index) => !(digit === digits[index - 1] && digit === digits[index + 1]));
export const neverDecrease = digits => digits.reduce((a, c) => (a !== -1 && c >= a ? c : -1)) !== -1;

export const countCandidates = (current, end, isCandidate, getNext, candidatesSoFar = 0) => {
  let count = candidatesSoFar;
  while (current < end) {
    count += isCandidate(current);
    if (isCandidate(current)) console.log('candidate', current);
    current = getNext(current);
  }
  return count;
};
