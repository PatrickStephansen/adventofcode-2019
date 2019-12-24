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
  halt,
  runProgram
} from './intcode/index.mjs';
import { indexBy } from './index-by.mjs';
import { input as boostTest } from './9-input.mjs';

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

(async () => {
  await runProgram({
    getSystemInput: () => 2,
    writeSystemOutput: console.log,
    memory: boostTest,
    instructionDefinitions: instructionSet
  });
})();
