import { parseInput } from './orbits.mjs';
import { toTrees } from './orbits.mjs';
import { getUniqueCelestialBodies } from './orbits.mjs';
import { getCentresOfMass } from './orbits.mjs';
import { input as input6 } from './6-input.mjs';

const cases = [
  {
    input: `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`,
    expectedOutput: 42
  },
  {
    input: input6
  }
];

const countSubtreeOrbits = (trees, depth) =>
  trees.length &&
  trees.length * depth +
    trees.reduce((sum, subtree) => sum + countSubtreeOrbits(subtree.orbitedBy, depth + 1), 0);
const countAllOrbits = input => {
  const orbitalRelations = parseInput(input);
  const trees = toTrees(
    getCentresOfMass(getUniqueCelestialBodies(orbitalRelations), orbitalRelations),
    orbitalRelations
  );
  return countSubtreeOrbits(trees, 0);
};

for (const testCase of cases) {
  console.log(
    'expected output',
    testCase.expectedOutput,
    'actual output',
    countAllOrbits(testCase.input)
  );
}
