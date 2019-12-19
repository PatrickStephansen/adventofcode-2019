import { parseInput } from './orbits.mjs';
import { toTrees } from './orbits.mjs';
import { getCentresOfMass } from './orbits.mjs';
import { getUniqueCelestialBodies } from './orbits.mjs';
import { input as input6 } from './6-input.mjs';
import { probe } from './probe.mjs';

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

const pathFromCentreOfMass = (trees, target, path=[]) =>
  trees.flatMap(t =>
    t.body === target ? path : pathFromCentreOfMass(t.orbitedBy, target, [...path, t.body])
  );

const trimMatchingStart = (a, b) => {
  let index = 0;
  for (; a[index] === b[index]; index++);
  return [a.slice(index), b.slice(index)];
};

const countOrbitalTransfers = (orbitsText, start, target) => {
  const orbitalRelations = parseInput(orbitsText);
  const trees = toTrees(
    getCentresOfMass(getUniqueCelestialBodies(orbitalRelations), orbitalRelations),
    orbitalRelations
  );
  const startPath = pathFromCentreOfMass(trees, start);
  const targetPath = pathFromCentreOfMass(trees, target);
  const [uniqueStartPath, uniqueTargetPath] = trimMatchingStart(startPath, targetPath);
  return uniqueStartPath.length + uniqueTargetPath.length;
};

for (const testCase of cases) {
  console.log(
    'expected',
    testCase.expectedOutput,
    'actual',
    countOrbitalTransfers(testCase.input, 'YOU', 'SAN')
  );
}
