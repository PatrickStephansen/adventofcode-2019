export const getNextToCheck = n => n + 1;
export const isCandidate = n => false;

export const countCandidates = (current, end, isCandidate, getNext, candidatesSoFar = 0) =>
  current >= end
    ? candidatesSoFar
    : countCandidates(
        getNext(current),
        end,
        isCandidate,
        getNext,
        candidatesSoFar + isCandidate(current)
      );


