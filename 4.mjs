import {
  countCandidates,
  getNextToCheck,
  isCandidate,
  splitNumber,
  hasRepeatingDigit,
  neverDecrease
} from './4-lib.mjs';

const start = 124075;
const end = 580769;
const isCandidate = n =>
  ((digits = splitNumber(n)) => hasRepeatingDigit(digits) && neverDecrease(digits))();
console.log(countCandidates(start, end, isCandidate, getNextToCheck));
