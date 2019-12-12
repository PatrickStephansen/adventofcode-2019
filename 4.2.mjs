import { countCandidates, getNextToCheck, neverDecrease, splitNumber } from './4-lib.mjs';

const hasMatchingPair = digits =>
  digits.some(d => digits.reduce((a, c) => (c === d ? a + 1 : a), 0) === 2);

const start = 124075;
const end = 580769;

const isCandidate = n =>
  ((digits = splitNumber(n)) => hasMatchingPair(digits) && neverDecrease(digits))();
console.log(countCandidates(start, end, isCandidate, getNextToCheck));
