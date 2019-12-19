export const getPermutations = set =>
  set.length === 1
    ? [set]
    : set.reduce(
        (permutations, value, index) => [
          ...permutations,
          ...getPermutations(set.filter((_, i) => i !== index)).map(permutedRest => [
            value,
            ...permutedRest
          ])
        ],
        []
      );
