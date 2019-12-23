import {
  add,
  multiply,
  readInput,
  print,
  jumpIfFalse,
  jumpIfTrue,
  lessThan,
  equals,
  halt,
  runProgram
} from './intcode/index.mjs';
import { indexBy } from './index-by.mjs';
import { input as thrusterProgram } from './7-input.mjs';
import { probe } from './probe.mjs';
import { getPermutations } from './permutations.mjs';

const instructionSet = [
  add,
  multiply,
  readInput,
  print,
  jumpIfFalse,
  jumpIfTrue,
  lessThan,
  equals,
  halt
];
const instructionDefinitions = indexBy('opcode', instructionSet);
const waitForInput = () =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, 0)
  );

const cases = [
  {
    program: [
      3,
      26,
      1001,
      26,
      -4,
      26,
      3,
      27,
      1002,
      27,
      2,
      27,
      1,
      27,
      26,
      27,
      4,
      27,
      1001,
      28,
      -1,
      28,
      1005,
      28,
      6,
      99,
      0,
      0,
      5
    ],
    phases: [[9, 8, 7, 6, 5]],
    expectedOutput: 139629729
  },
  {
    program: [
      3,
      52,
      1001,
      52,
      -5,
      52,
      3,
      53,
      1,
      52,
      56,
      54,
      1007,
      54,
      5,
      55,
      1005,
      55,
      26,
      1001,
      54,
      -5,
      54,
      1105,
      1,
      12,
      1,
      53,
      54,
      53,
      1008,
      54,
      0,
      55,
      1001,
      55,
      1,
      55,
      2,
      53,
      55,
      53,
      4,
      53,
      1001,
      56,
      -1,
      56,
      1005,
      56,
      6,
      99,
      0,
      0,
      0,
      0,
      10
    ],
    phases: [[9, 7, 8, 5, 6]],
    expectedOutput: 18216
  },
  { program: thrusterProgram, phases: getPermutations([5, 6, 7, 8, 9]) }
];

const runFeedbackAmplifiers = async (instructionDefinitions, phasePermutations, program) => {
  const thrustOutputs = phasePermutations.map(async phaseSettings => {
    let thrust = 0;
    const amplifiers = phaseSettings.map((phase, index) => {
      let inputBuffer = [phase];
      if (index === 0) {
        inputBuffer.push(thrust);
      }
      return {
        getSystemInput: async () => {
          while (!(inputBuffer && inputBuffer.length)) {
            await waitForInput();
          }
          return Promise.resolve(inputBuffer.shift());
        },
        writeSystemOutput: value => {
          thrust = value;
          amplifiers[(index + 1) % amplifiers.length].inputBuffer.push(value);
        },
        instructionDefinitions,
        memory: program,
        inputBuffer
      };
    });

    await Promise.all(amplifiers.map(async amplifier => runProgram(amplifier)));

    return amplifiers[0].inputBuffer.shift();
  });

  return probe(
    'max thrust',
    Math.max(...probe('thrust outputs', await Promise.all(thrustOutputs)))
  );
};

(async () => {
  for (const testCase of cases) {
    probe(
      `expected output: ${testCase.expectedOutput}, actual:`,
      await runFeedbackAmplifiers(instructionDefinitions, testCase.phases, testCase.program)
    );
  }
})();
