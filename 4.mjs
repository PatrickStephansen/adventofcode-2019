import { countCandidates, getNextToCheck, isCandidate } from './4-lib.mjs';
import { probe } from './probe.mjs';

const start = 124075;
const end = 580769;

console.log(countCandidates(start, end, isCandidate, n => probe('trying', getNextToCheck(n))));
