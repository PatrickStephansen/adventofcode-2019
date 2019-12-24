import { probe } from './probe.mjs';
import {
  toCoordinateList,
  interpretMap,
  toPolarCoordinates,
  closeEnough
} from './asteroid-detection.mjs';
import { input as asteroidMap } from './10-input.mjs';

const cases = [
  //   {
  //     input: `.#..#
  // .....
  // #####
  // ....#
  // ...##`,
  //     expectedOutput: 8
  //   },
  {
    input: `......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####`,
    expectedOutput: 33
  },
  {
    input: `#.#...#.#.
.###....#.
.#....#...
##.#.#.#.#
....#.#.#.
.##..###.#
..#...##..
..##....##
......#...
.####.###.`,
    expectedOutput: 35
  },
  {
    input: `.#..#..###
####.###.#
....###.#.
..###.##.#
##.##.#.#.
....###..#
..#.#..#.#
#..#.#.###
.##...##.#
.....#.#..`,
    expectedOutput: 41
  },
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
    expectedOutput: 210
  },
  { input: asteroidMap }
];

const countAsteroidsVisibleFromBestLocation = asteroidMap =>
  Math.max(
    ...toCoordinateList(interpretMap(asteroidMap)).map((origin, originIndex, asteroids) =>
      asteroids
        .filter((_, index) => index !== originIndex)
        .map(asteroid => toPolarCoordinates(origin, asteroid))
        .sort((a, b) => b.radians - a.radians)
        .reduce(
          (count, asteroid, index, otherAsteroids) =>
            closeEnough((otherAsteroids[index + 1] || { radians: 1000 }).radians, asteroid.radians)
              ? count
              : count + 1,
          0
        )
    )
  );

for (const testCase of cases) {
  probe(
    `expectedOutput ${testCase.expectedOutput}, actual:`,
    countAsteroidsVisibleFromBestLocation(testCase.input)
  );
}
