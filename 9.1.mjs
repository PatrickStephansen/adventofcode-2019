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
import { probe } from './probe.mjs';
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

const cases = [
  {
    input: [109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99],
    expectedOutput: '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99'
  },
  { input: [1102, 34915192, 34915192, 7, 4, 7, 99, 0], expectedOutput: 'a 16 digit number' },
  {
    input: [104, 1125899906842624, 99],
    expectedOutput: '1125899906842624'
  },
  { input: boostTest }
];
(async () => {
  for (const testCase of cases) {
    let output = '';
    await runProgram({
      getSystemInput: () => 1,
      writeSystemOutput: o => (output += `,${o}`),
      memory: testCase.input,
      instructionDefinitions: instructionSet
    });
    probe(`expected output: ${testCase.expectedOutput}, actual: `, output);
  }
})();
