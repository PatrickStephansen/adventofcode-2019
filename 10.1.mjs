import { probe } from './probe.mjs';
import { toCoordinateList, interpretMap, countVisibleAsteroids } from './asteroid-detection.mjs';
import { input as asteroidMap } from './10-input.mjs';
import {} from './asteroid-detection.mjs';

const cases = [
  {
    input: `.#..#
  .....
  #####
  ....#
  ...##`,
    expectedOutput: 8
  },
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
  Math.max(...toCoordinateList(interpretMap(asteroidMap)).map(countVisibleAsteroids));

for (const testCase of cases) {
  probe(
    `expectedOutput ${testCase.expectedOutput}, actual:`,
    countAsteroidsVisibleFromBestLocation(testCase.input)
  );
}
