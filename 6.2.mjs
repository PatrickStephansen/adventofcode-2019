import { parseInput } from './orbits.mjs';
import { toTrees } from './orbits.mjs';
import { getCentresOfMass } from './orbits.mjs';
import { getUniqueCelestialBodies } from './orbits.mjs';
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
K)L
K)YOU
I)SAN`,
    expectedOutput: 4
  },
  {
    input: input6
  }
];

// these haven't happened mid path so far
const toFlattenedString = s => s.toString().replace(/(?:^,+)|(?:,+$)/g, '');

// lazy version - leaves lots of empty arrays and nesting in the result
const depthFirstSearch = (trees, target, path = []) =>
  trees.map(t =>
    t.body === target ? path : depthFirstSearch(t.orbitedBy, target, [...path, t.body])
  );

const trimMatchingStart = (a, b) => {
  let index = 0;
  for (; a[index] === b[index]; index++);
  return [a.slice(index), b.slice(index)];
};

const getStringArrayLength = arrayAsString => arrayAsString.split(',').length;

const countOrbitalTransfers = (orbitsText, start, target) => {
  const orbitalRelations = parseInput(orbitsText);
  const trees = toTrees(
    getCentresOfMass(getUniqueCelestialBodies(orbitalRelations), orbitalRelations),
    orbitalRelations
  );
  const startPath = toFlattenedString(depthFirstSearch(trees, start));
  const targetPath = toFlattenedString(depthFirstSearch(trees, target));
  const [uniqueStartPath, uniqueTargetPath] = trimMatchingStart(startPath, targetPath);
  return getStringArrayLength(uniqueStartPath) + getStringArrayLength(uniqueTargetPath);
};

for (const testCase of cases) {
  console.log(
    'expected',
    testCase.expectedOutput,
    'actual',
    countOrbitalTransfers(testCase.input, 'YOU', 'SAN')
  );
}
