import { probe } from './probe.mjs';
import {
  toCoordinateList,
  interpretMap,
  toPolarCoordinates,
  closeEnough
} from './asteroid-detection.mjs';
import { input as asteroidMap } from './10-input.mjs';
import { countVisibleAsteroids } from './asteroid-detection.mjs';

const cases = [
  {
    input: `.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`,
    expectedOutput: 802
  },
  { input: asteroidMap }
];

const getSortScore = a => a.eclipsingOrigin.length * 1000 + a.polar.radians;

const getNthToBeDestroyed = (asteroidMap, n) => {
  const asteroidCoordinates = toCoordinateList(interpretMap(asteroidMap));
  const visibleAsteroidsPerOrigin = asteroidCoordinates.map((origin, originIndex, asteroids) => {
    const visibleAsteroidCount = countVisibleAsteroids(origin, originIndex, asteroids);
    return { visibleAsteroidCount, cartesian: origin };
  });
  const maxVisibleAsteroids = Math.max(
    ...visibleAsteroidsPerOrigin.map(a => a.visibleAsteroidCount)
  );
  const baseLocation = visibleAsteroidsPerOrigin.find(
    a => a.visibleAsteroidCount === maxVisibleAsteroids
  );
  const otherAsteroids = asteroidCoordinates
    .filter(a => !(a.x === baseLocation.cartesian.x && a.y === baseLocation.cartesian.y))
    .map(a => ({
      cartesian: a,
      polar: toPolarCoordinates(baseLocation.cartesian, a),
      coordNumber: a.x * 100 + a.y
    }))
    .map((asteroid, index, asteroids) => ({
      ...asteroid,
      eclipsingOrigin: asteroids.filter(
        otherAsteroid =>
          closeEnough(otherAsteroid.polar.radians, asteroid.polar.radians) &&
          otherAsteroid.polar.distance < asteroid.polar.distance
      )
    }))
    .sort((a, b) => getSortScore(a) - getSortScore(b));
  return otherAsteroids[n - 1].coordNumber;
};

for (const testCase of cases) {
  probe(
    `expected output ${testCase.expectedOutput}, actual`,
    JSON.stringify(getNthToBeDestroyed(testCase.input, 200), null, 2)
  );
}
