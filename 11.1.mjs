import { runPainterProgram } from './hull-painter.mjs';
import {
  add,
  multiply,
  readInput,
  print,
  jumpIfFalse,
  jumpIfTrue,
  lessThan,
  equals,
  relativeBaseOffset,
  halt
} from './intcode/index.mjs';
import { indexBy } from './index-by.mjs';
import { input as painterProgram } from './11-input.mjs';

const instructionSet = indexBy('opcode', [
  add,
  multiply,
  readInput,
  print,
  jumpIfFalse,
  jumpIfTrue,
  lessThan,
  equals,
  relativeBaseOffset,
  halt
]);

const directions = ['up', 'right', 'down', 'left'];
const pallette = ['black', 'white'];

let robotLocation = { coordinates: { x: 0, y: 0 }, direction: 'up' };
const paintedPanels = [];
(async () => {
  const {
    paintedPanels: endingPaintedPanels,
    robotLocation: endingRobotLocation
  } = await runPainterProgram(
    directions,
    pallette,
    robotLocation,
    paintedPanels,
    false,
    instructionSet,
    painterProgram
  );

  console.log(endingPaintedPanels.length);
})();
